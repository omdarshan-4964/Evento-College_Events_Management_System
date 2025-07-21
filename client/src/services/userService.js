import api from './api';

const userService = {
    getAllUsers: () => api.get('/users'),
    updateUserRole: (userId, role) => api.put(`/users/${userId}/role`, { role }),
};

export default userService;
