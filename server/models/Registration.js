const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    // The specific booking the user is registering for
    booking: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Booking',
    },
    // The user who is registering
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    // The event associated with the booking
    event: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Event',
    }
}, {
    timestamps: true,
});

// Prevent a user from registering for the same event more than once
registrationSchema.index({ booking: 1, user: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
