const express = require('express');

const requireAuth = require('../middleware/authMiddleware');
const {createMenu, getMenu, getMenuById, updateMenu, deleteMenu} = require('../controllers/menu.controller');

const verifyRestaurantOwnership = require('../middleware/verifyRestaurant');

const router = express.Router();
router.use(requireAuth);
router.use(verifyRestaurantOwnership);

router.post('/', verifyRestaurantOwnership, createMenu)
router.get('/', getMenu)
router.get('/:id', getMenuById)
router.put('/:id', verifyRestaurantOwnership, updateMenu)
router.delete('/:id', verifyRestaurantOwnership, deleteMenu)

// router.get('/category/:categoryId', getMenusByCategory);

module.exports = router;
