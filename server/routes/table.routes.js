const express = require('express');
const tableController = require('../controllers/table.controller');

const requireAuth = require('../middleware/authMiddleware');
const verifyRestaurantOwnership = require('../middleware/verifyRestaurant');

const router = express.Router();
router.use(requireAuth);
router.use(verifyRestaurantOwnership);

// You can add authentication middleware here if needed
router.get('/', verifyRestaurantOwnership, tableController.getTables);
router.post('/', verifyRestaurantOwnership, tableController.createTable);
router.get('/:restaurantId', verifyRestaurantOwnership, tableController.getTableById);
router.put('/:id', verifyRestaurantOwnership, tableController.updateTable);
router.delete('/:id', verifyRestaurantOwnership, tableController.deleteTable);

module.exports = router;
