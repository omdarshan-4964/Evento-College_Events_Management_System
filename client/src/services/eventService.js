import api from './api';

const eventService = {
    createEvent: (eventData) => api.post('/events', eventData),
    
    // Gets all events - useful for a public view later
    getAllEvents: () => api.get('/events'),
    
    // NOTE: We need a backend endpoint for this. For now, we'll filter on the frontend.
    // A better approach is a dedicated backend route like GET /api/events/my-events
};

export default eventService;
