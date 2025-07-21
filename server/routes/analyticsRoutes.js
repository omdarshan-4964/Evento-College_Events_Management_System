const express = require('express');
const router = express.Router();
const { getSummary, getVenueUtilization } = require('../controllers/analyticsController');
const { protect, superAdmin } = require('../middleware/authMiddlewares');

// All routes in this file are protected and for super admins only
router.use(protect, superAdmin);

router.get('/summary', getSummary);
router.get('/venue-utilization', getVenueUtilization);

module.exports = router;
