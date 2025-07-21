// server/controllers/bookingController.js
const Booking = require('../models/Booking');
const Registration = require('../models/Registration');

/**
 * @desc    Create a new booking request
 * @route   POST /api/bookings
 * @access  Private/ClubAdmin
 */
const createBooking = async (req, res) => {
  const { event, venue, startTime, endTime } = req.body;

  if (!event || !venue || !startTime || !endTime) {
    return res.status(400).json({ message: 'Missing required booking information.' });
  }

  try {
    // CONFLICT DETECTION LOGIC
    const conflictingBooking = await Booking.findOne({
      venue: venue,
      status: 'approved', // Only check against approved bookings
      $or: [
        // Case 1: New booking starts during an existing booking
        { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
      ],
    });

    if (conflictingBooking) {
      return res.status(409).json({ // 409 Conflict
        message: 'Booking conflict: This venue is already booked for the requested time.',
        conflictingBooking: {
            event: conflictingBooking.event,
            startTime: conflictingBooking.startTime,
            endTime: conflictingBooking.endTime
        }
      });
    }

    const booking = new Booking({
      event,
      venue,
      startTime,
      endTime,
      user: req.user._id, // The user making the request
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);

  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all bookings (for admin view)
 * @route   GET /api/bookings
 * @access  Private/SuperAdmin
 */
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate('event', 'name clubName')
            .populate('venue', 'name location')
            .populate('user', 'name email');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc    Update a booking's status (approve/reject)
 * @route   PUT /api/bookings/:id/status
 * @access  Private/SuperAdmin
 */
const updateBookingStatus = async (req, res) => {
    const { status } = req.body;
    if (!['approved', 'rejected', 'cancelled'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status provided.' });
    }

    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        booking.status = status;
        const updatedBooking = await booking.save();
        res.status(200).json(updatedBooking);

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Add this function to your bookingController.js
const getApprovedBookings = async (req, res) => {
    try {
        // Fetch all approved bookings and populate related data
        const bookings = await Booking.find({ status: 'approved' })
            .populate('event', 'name clubName')
            .populate('venue', 'name capacity')
            .lean(); // .lean() returns plain JS objects, which is faster and allows modification

        // For each booking, calculate the registration count
        const bookingsWithCounts = await Promise.all(
            bookings.map(async (booking) => {
                const count = await Registration.countDocuments({ booking: booking._id });
                return {
                    ...booking,
                    registrationCount: count, // Add the new field
                };
            })
        );

        res.status(200).json(bookingsWithCounts);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

// Add this function to your bookingController.js

/**
 * @desc    Get bookings for the logged-in user
 * @route   GET /api/bookings/my-bookings
 * @access  Private/ClubAdmin
 */
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id })
            .populate('event', 'name clubName')
            .populate('venue', 'name location')
            .sort({ createdAt: -1 }); // Show most recent first
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const updateBooking = async (req, res) => {
    const { startTime, endTime } = req.body;
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Authorization Check: Allow if user is super_admin or the original creator
        if (booking.user.toString() !== req.user.id && req.user.role !== 'super_admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Update fields
        booking.startTime = startTime || booking.startTime;
        booking.endTime = endTime || booking.endTime;
        // When a booking is edited, it should probably go back to pending
        booking.status = 'pending'; 

        const updatedBooking = await booking.save();
        res.json(updatedBooking);

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc    Delete (cancel) a booking
 * @route   DELETE /api/bookings/:id
 * @access  Private (Creator or SuperAdmin)
 */
const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Authorization Check
        if (booking.user.toString() !== req.user.id && req.user.role !== 'super_admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        // Also delete all registrations associated with this booking
        await Registration.deleteMany({ booking: req.params.id });
        await booking.deleteOne();

        res.json({ message: 'Booking and associated registrations removed' });

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate('event', 'name')
            .populate('venue', 'name');

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // NOTE: We could add an authorization check here if needed, but for now,
        // the edit/delete routes provide the necessary security.
        res.json(booking);

    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = { 
  createBooking, 
  getAllBookings, 
  getBookingById,
  updateBookingStatus, 
  getApprovedBookings, 
  getMyBookings,
  updateBooking,
  deleteBooking
 };


