// routes/public.routes.js
const express = require("express");
const Restaurant = require("../models/Restaurant");
const Category = require("../models/Category");
const Menu = require("../models/Menu");

const router = express.Router();

// Existing route for restaurant details
router.get("/restaurant/:restaurantId", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/public/restaurant/:restaurantId/menu
router.get("/restaurant/:restaurantId/menu", async (req, res) => {
  try {
    const restaurantId = req.params.restaurantId;

    // Fetch categories for the restaurant
    const categories = await Category.find({ restaurantId }).lean();

    // For each category, fetch the related menu items
    const categoriesWithItems = await Promise.all(
      categories.map(async (category) => {
        const items = await Menu.find({ category: category._id }).lean();
        return {
          _id: category._id,
          name: category.name,
          description: category.description || "",
          items,
        };
      })
    );

    res.json(categoriesWithItems);
  } catch (error) {
    console.error("Error fetching categories and items:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
