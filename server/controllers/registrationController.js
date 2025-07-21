const Registration = require('../models/Registration');
const Booking = require('../models/Booking');

/**
 * @desc    Register for an event (via a booking)
 * @route   POST /api/registrations
 * @access  Private (Students)
 */
const createRegistration = async (req, res) => {
    const { bookingId } = req.body;
    const userId = req.user._id;

    try {
        // 1. Find the booking and populate event and venue details
        const booking = await Booking.findById(bookingId).populate('venue');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found.' });
        }

        // 2. Check for duplicate registration
        const existingRegistration = await Registration.findOne({ booking: bookingId, user: userId });
        if (existingRegistration) {
            return res.status(400).json({ message: 'You are already registered for this event.' });
        }

        // 3. Check venue capacity
        const registrationCount = await Registration.countDocuments({ booking: bookingId });
        if (registrationCount >= booking.venue.capacity) {
            return res.status(400).json({ message: 'This event is full. No more registrations allowed.' });
        }

        // 4. Create the new registration
        const registration = new Registration({
            booking: bookingId,
            user: userId,
            event: booking.event,
        });

        await registration.save();
        res.status(201).json(registration);

    } catch (error) {
        // Handle potential unique index error gracefully
        if (error.code === 11000) {
             return res.status(400).json({ message: 'You are already registered for this event.' });
        }
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc    Get all registrations for the logged-in user
 * @route   GET /api/registrations/my-registrations
 * @access  Private
 */
const getMyRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find({ user: req.user._id })
            .populate({
                path: 'booking',
                populate: {
                    path: 'event venue'
                }
            });
        res.status(200).json(registrations);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    createRegistration,
    getMyRegistrations,
};
