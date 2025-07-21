const express = require('express');
const router = express.Router();
const { createRegistration, getMyRegistrations } = require('../controllers/registrationController');
const { protect } = require('../middleware/authMiddlewares');

// Route for a user to get their own registrations
router.get('/my-registrations', protect, getMyRegistrations);

// Route for a user to create a new registration
router.post('/', protect, createRegistration);

module.exports = router;
