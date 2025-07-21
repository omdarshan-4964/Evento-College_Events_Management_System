import api from './api';

const analyticsService = {
    getSummary: () => api.get('/analytics/summary'),
    getVenueUtilization: () => api.get('/analytics/venue-utilization'),
};

export default analyticsService;
