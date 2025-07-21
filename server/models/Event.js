const mongoose = require('mongoose');

/**
 * Event Schema
 * Defines the structure for event documents.
 */
const eventSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add an event name'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    // Link to the user who organized the event (must be a club_admin)
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    clubName: {
      type: String,
      required: [true, 'Please add the club name'],
    },
    category: {
      type: String,
      required: true,
      enum: ['Workshop', 'Competition', 'Seminar', 'Cultural', 'Other'],
      default: 'Seminar',
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
