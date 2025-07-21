// server/routes/bookingRoutes.js

const express = require('express');
const router = express.Router();

const { createBooking, 
        getAllBookings, 
        updateBookingStatus, 
        getApprovedBookings, 
        getMyBookings,
        updateBooking,
        deleteBooking,
        getBookingById
    } = require('../controllers/bookingController');
// Corrected the path to match your filename 'authMiddlewares.js'
const { protect, clubAdmin, superAdmin } = require('../middleware/authMiddlewares');

// Club admins can create bookings
router.route('/').post(protect, clubAdmin, createBooking);

// Super admins can view all bookings
router.route('/').get(protect, superAdmin, getAllBookings);

// Super admins can approve/reject bookings
router.route('/:id/status').put(protect, superAdmin, updateBookingStatus);
router.route('/public/approved').get(protect, getApprovedBookings)
router.route('/my-bookings').get(protect, clubAdmin, getMyBookings);
router.route('/:id')
    .get(protect, getBookingById)
    .put(protect, updateBooking)
    .delete(protect, deleteBooking);
module.exports = router;
