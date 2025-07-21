const User = require('../models/User');

/**
 * @desc    Get all users
 * @route   GET /api/users
 * @access  Private/SuperAdmin
 */
const getUsers = async (req, res) => {
    try {
        // Find all users and exclude their passwords from the result
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

/**
 * @desc    Update a user's role
 * @route   PUT /api/users/:id/role
 * @access  Private/SuperAdmin
 */
const updateUserRole = async (req, res) => {
    const { role } = req.body;
    const validRoles = ['student', 'club_admin', 'super_admin'];

    if (!role || !validRoles.includes(role)) {
        return res.status(400).json({ message: 'Please provide a valid role.' });
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.role = role;
        await user.save();
        
        // Return the updated user object without the password
        const updatedUser = user.toObject();
        delete updatedUser.password;

        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

module.exports = {
    getUsers,
    updateUserRole,
};
