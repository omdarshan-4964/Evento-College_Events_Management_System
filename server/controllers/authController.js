const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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

/**
 * @desc    Google OAuth Login
 * @route   POST /api/auth/google
 * @access  Public
 */
const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify the Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;
    
    // Check if email is from allowed domain
    const allowedDomain = '@gmail.com';
    if (!email.endsWith(allowedDomain)) {
      return res.status(400).json({ 
        message: `Registration is only allowed for ${allowedDomain} addresses.` 
      });
    }
    
    // Find or create user
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user with Google auth
      user = await User.create({
        name,
        email,
        googleId,
        profilePicture: picture,
        role: 'student', // Default role
        password: Math.random().toString(36).slice(-8), // Random password (not used)
      });
    } else if (!user.googleId) {
      // Update existing user with Google ID
      user.googleId = googleId;
      user.profilePicture = picture;
      await user.save();
    }
    
    // Return user data with JWT token
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(401).json({ 
      message: 'Invalid Google token or authentication failed',
      error: error.message 
    });
  }
};

module.exports = { registerUser, loginUser, googleLogin };
