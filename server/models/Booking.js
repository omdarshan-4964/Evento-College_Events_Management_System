const mongoose = require('mongoose');

/**
 * Booking Schema
 * This is the core model that connects an Event to a Venue for a specific time.
 */
const bookingSchema = mongoose.Schema(
  {
    // Link to the event being booked
    event: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Event',
    },
    // Link to the venue being booked
    venue: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Venue',
    },
    // Link to the user who made the request
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    startTime: {
      type: Date,
      required: [true, 'Please add a start time'],
    },
    endTime: {
      type: Date,
      required: [true, 'Please add an end time'],
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

// Add a validation to ensure endTime is after startTime
bookingSchema.pre('save', function(next) {
  if (this.startTime >= this.endTime) {
    next(new Error('End time must be after start time.'));
  } else {
    next();
  }
});


const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
