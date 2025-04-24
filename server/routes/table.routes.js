const express = require('express');
const tableController = require('../controllers/table.controller');

// const requireAuth = require('../middleware/authMiddleware');
// const verifyRestaurantOwnership = require('../middleware/verifyRestaurant');

const router = express.Router();
// router.use(requireAuth);
// router.use(verifyRestaurantOwnership);

// You can add authentication middleware here if needed
router.post('/', tableController.createTable);
router.get('/:restaurantId', tableController.getTables);
router.put('/:id', tableController.updateTable);
router.delete('/:id', tableController.deleteTable);

// router.post('/', verifyRestaurantOwnership, tableController.createTable);
// router.get('/:restaurantId', verifyRestaurantOwnership, tableController.getTables);
// router.put('/:id', verifyRestaurantOwnership, tableController.updateTable);
// router.delete('/:id', verifyRestaurantOwnership, tableController.deleteTable);

module.exports = router;
