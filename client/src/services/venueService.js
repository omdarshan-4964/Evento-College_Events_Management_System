import api from './api';

const venueService = {
    createVenue: (venueData) => api.post('/venues', venueData),
    getVenues: () => api.get('/venues'),
};

export default venueService;
