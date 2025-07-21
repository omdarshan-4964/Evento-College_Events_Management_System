const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Utility to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Email domain validation
    const allowedDomain = '@gmail.com';
    if (!email.endsWith(allowedDomain)) {
        return res.status(400).json({ message: `Registration is only allowed for ${allowedDomain} addresses.` });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'A user with this email already exists.' });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      // UPDATED: Send a simple success message instead of logging the user in.
      res.status(201).json({
        message: 'User registered successfully! Please log in.'
      });
    } else {
      res.status(400).json({ message: 'Invalid user data provided.' });
    }
  } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

/**
 * @desc    Auth user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = { registerUser, loginUser };
