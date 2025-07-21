const express = require('express');
const router = express.Router();
const { getUsers, updateUserRole } = require('../controllers/userController');
const { protect, superAdmin } = require('../middleware/authMiddlewares');

// All routes in this file are protected and for super admins only
router.use(protect, superAdmin);

// Route to get all users
router.get('/', getUsers);

// Route to update a specific user's role
router.put('/:id/role', updateUserRole);

module.exports = router;
