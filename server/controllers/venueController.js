// server/controllers/venueController.js

const Venue = require('../models/Venue');

/**
 * @desc    Create a new venue
 * @route   POST /api/venues
 * @access  Private/SuperAdmin
 */
const createVenue = async (req, res) => {
  const { name, location, capacity } = req.body;

  // Basic validation
  if (!name || !location || !capacity) {
    return res.status(400).json({ message: 'Please provide all required fields: name, location, and capacity.' });
  }

  try {
    // Check if a venue with the same name already exists
    const venueExists = await Venue.findOne({ name });
    if (venueExists) {
      return res.status(400).json({ message: `Venue with name '${name}' already exists.` });
    }

    // Create a new venue instance
    const venue = new Venue({
      name,
      location,
      capacity,
    });

    // Save the new venue to the database
    const createdVenue = await venue.save();
    res.status(201).json(createdVenue);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while creating venue.', error: error.message });
  }
};

/**
 * @desc    Get all venues
 * @route   GET /api/venues
 * @access  Private (accessible to any logged-in user)
 */
const getVenues = async (req, res) => {
  try {
    // Fetch all venues from the database
    const venues = await Venue.find({});
    res.status(200).json(venues);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error while fetching venues.', error: error.message });
  }
};

module.exports = {
  createVenue,
  getVenues,
};
