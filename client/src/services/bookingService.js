// import api from './api';

// const bookingService = {
//     // For Club Admins to create a booking request
//     createBooking: (bookingData) => api.post('/bookings', bookingData),

//     // For Super Admins to get all bookings
//     getAllBookings: () => api.get('/bookings'),

//     // For Super Admins to update a booking's status
//     updateBookingStatus: (bookingId, status) => api.put(`/bookings/${bookingId}/status`, { status }),
//     getApprovedBookings: () => api.get('/bookings/public/approved'),
//     getMyBookings: () => api.get('/bookings/my-bookings'),
//     getBookingById: (bookingId) => api.get(`/bookings/${bookingId}`), // We need a backend route for this
//     updateBooking: (bookingId, bookingData) => api.put(`/bookings/${bookingId}`, bookingData),
//     deleteBooking: (bookingId) => api.delete(`/bookings/${bookingId}`),
// };

// export default bookingService;




import api from './api';

const bookingService = {
    // For Club Admins to create a booking request
    createBooking: (bookingData) => api.post('/bookings', bookingData),

    // For Super Admins to get all bookings
    getAllBookings: () => api.get('/bookings'),

    // For Super Admins to update a booking's status
    updateBookingStatus: (bookingId, status) => api.put(`/bookings/${bookingId}/status`, { status }),

    // For the public calendar view
    getApprovedBookings: () => api.get('/bookings/public/approved'),

    // For a Club Admin to get their own bookings
    getMyBookings: () => api.get('/bookings/my-bookings'),

    // For the Edit Booking page to get a single booking's details
    getBookingById: (bookingId) => api.get(`/bookings/${bookingId}`),
    
    // For editing a booking's details
    updateBooking: (bookingId, bookingData) => api.put(`/bookings/${bookingId}`, bookingData),

    // For cancelling/deleting a booking
    deleteBooking: (bookingId) => api.delete(`/bookings/${bookingId}`),
};

export default bookingService;
