const express = require("express");
const ensureLogin = require("connect-ensure-login");
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const verifyRestaurantOwnership = require("../middleware/verifyRestaurant");

const router = express.Router();
router.use(ensureLogin.ensureLoggedIn());

// Create Category
router.post("/", verifyRestaurantOwnership, createCategory);

// Get Categories (filtered by logged-in user's restaurantId)
router.get("/", getCategories);

// Get Category by ID
router.get("/:id", getCategoryById);

// Update Category
router.put("/:id", verifyRestaurantOwnership, updateCategory);

// Delete Category
router.delete("/:id", verifyRestaurantOwnership, deleteCategory);

module.exports = router;
