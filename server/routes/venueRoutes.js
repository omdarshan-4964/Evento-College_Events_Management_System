// server/routes/venueRoutes.js

const express = require('express');
const router = express.Router();
const { createVenue, getVenues } = require('../controllers/venueController');
// Corrected the path to match your filename 'authMiddlewares.js'
const { protect, superAdmin } = require('../middleware/authMiddlewares');

/**
 * Route to get all venues and create a new venue.
 *
 * GET /api/venues
 * - Protected route: Requires a valid token for any logged-in user.
 * - Fetches a list of all venues.
 *
 * POST /api/venues
 * - Protected route: Requires a valid token.
 * - Admin-only route: Requires the user to have the 'super_admin' role.
 * - Creates a new venue.
 */
router.route('/')
  .post(protect, superAdmin, createVenue)
  .get(protect, getVenues);

module.exports = router;
