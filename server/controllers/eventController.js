// server/controllers/eventController.js

const Event = require('../models/Event');

/**
 * @desc    Create a new event
 * @route   POST /api/events
 * @access  Private/ClubAdmin
 */
const createEvent = async (req, res) => {
  const { name, description, clubName, category } = req.body;

  if (!name || !description || !clubName || !category) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  try {
    const event = new Event({
      name,
      description,
      clubName,
      category,
      organizer: req.user._id, // Attach the logged-in user as the organizer
    });

    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Get all events
 * @route   GET /api/events
 * @access  Private (any logged-in user)
 */
const getAllEvents = async (req, res) => {
    try {
        // Populate organizer field with user's name and email
        const events = await Event.find({}).populate('organizer', 'name email');
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
  createEvent,
  getAllEvents,
};
