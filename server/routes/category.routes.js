const express = require('express');
const ensureLogin = require('connect-ensure-login');
const {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} = require('../controllers/category.controller');

const router = express.Router();
// router.use(ensureLogin.ensureLoggedIn());

router.post('/', createCategory)
router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.put('/:id', updateCategory)
router.delete('/:id', deleteCategory)


module.exports = router;
