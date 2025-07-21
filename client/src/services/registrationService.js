import api from './api';

const registrationService = {
    // For a student to register for a booking/event
    registerForEvent: (bookingId) => api.post('/registrations', { bookingId }),

    // To get all of the current user's registrations
    getMyRegistrations: () => api.get('/registrations/my-registrations'),
};

export default registrationService;
