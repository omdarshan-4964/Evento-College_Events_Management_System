// server/middleware/authMiddlewares.js

const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

/**
 * protect Middleware
 * Verifies the JWT token from the Authorization header.
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

/**
 * superAdmin Middleware
 * Checks if the authenticated user has the 'super_admin' role.
 */
const superAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'super_admin') {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: Not authorized as a super admin' });
  }
};

/**
 * clubAdmin Middleware
 * Checks if the authenticated user has the 'club_admin' role or 'super_admin' role.
 */
const clubAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'club_admin' || req.user.role === 'super_admin')) {
    next();
  } else {
    res.status(403).json({ message: 'Forbidden: This action is reserved for club admins.' });
  }
};

// This is the most important part.
// We are exporting an object with all three functions.
module.exports = { 
  protect, 
  superAdmin, 
  clubAdmin 
};
