// server/routes/eventRoutes.js
const express = require('express');
const router = express.Router();

const { protect, clubAdmin } = require('../middleware/authMiddlewares');


const eventController = require('../controllers/eventController');
const { createEvent, getAllEvents } = eventController;

router.route('/')
    .post(protect, clubAdmin, createEvent)
    .get(protect, getAllEvents);


module.exports = router;
