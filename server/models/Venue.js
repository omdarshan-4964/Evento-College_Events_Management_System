// server/models/Venue.js

const mongoose = require('mongoose');

/**
 * Venue Schema
 * Defines the structure for venue documents in the MongoDB collection.
 */
const venueSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a venue name'],
      trim: true, // Removes whitespace from both ends of a string
      unique: true,
    },
    location: {
      type: String,
      required: [true, 'Please add a location'],
      trim: true,
    },
    capacity: {
      type: Number,
      required: [true, 'Please add the venue capacity'],
    },
    // You could add more details later if needed
    // facilities: [{ type: String }], // e.g., ["Projector", "Whiteboard"]
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
