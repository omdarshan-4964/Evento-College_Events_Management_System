const Venue = require('../models/Venue');
const Event = require('../models/Event');
const Booking = require('../models/Booking');
const Registration = require('../models/Registration');

/**
 * @desc    Get summary statistics for the dashboard
 * @route   GET /api/analytics/summary
 * @access  Private/SuperAdmin
 */
const getSummary = async (req, res) => {
    try {
        const totalVenues = await Venue.countDocuments();
        const totalEvents = await Event.countDocuments();
        const totalBookings = await Booking.countDocuments();
        const totalRegistrations = await Registration.countDocuments();

        res.json({
            totalVenues,
            totalEvents,
            totalBookings,
            totalRegistrations,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc    Get venue utilization statistics
 * @route   GET /api/analytics/venue-utilization
 * @access  Private/SuperAdmin
 */
const getVenueUtilization = async (req, res) => {
    try {
        const utilization = await Booking.aggregate([
            {
                $group: {
                    _id: '$venue', // Group by the venue's ObjectId
                    count: { $sum: 1 }, // Count how many times each venue appears
                },
            },
            {
                $lookup: {
                    from: 'venues', // The collection to join with
                    localField: '_id',
                    foreignField: '_id',
                    as: 'venueDetails',
                },
            },
            {
                $unwind: '$venueDetails', // Deconstruct the venueDetails array
            },
            {
                $project: {
                    _id: 0, // Exclude the default _id field
                    name: '$venueDetails.name',
                    count: 1,
                },
            },
            {
                $sort: { count: -1 } // Sort by the most booked venues first
            }
        ]);

        res.json(utilization);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getSummary,
    getVenueUtilization,
};
