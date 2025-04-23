const express = require('express');
const ensureLogin = require('connect-ensure-login');
const {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant
} = require('../controllers/restaurant.controller');

const router = express.Router();

// Ensure the user is logged in before accessing any of these routes
router.use(ensureLogin.ensureLoggedIn());

// Routes
router.post('/', createRestaurant);
router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

module.exports = router;
