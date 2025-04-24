// routes/public.routes.js
const express = require("express");
const Restaurant = require("../models/Restaurant");
const Category = require("../models/Category");
const Menu = require("../models/Menu");
const Order = require("../models/Order");

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

// POST /api/public/restaurant/:restaurantId/table/:tableNumber/orders - Place an order
router.post("/restaurant/:restaurantId/table/:tableNumber/orders", async (req, res) => {
    try {
      const { restaurantId, tableNumber } = req.params;
      const { items } = req.body; // Should contain itemId and quantity
    
      // Validate the items
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items in the order" });
      }
  
      for (let item of items) {
        if (!item.quantity || item.quantity <= 0) {
          return res.status(400).json({ message: `Invalid quantity for item ${item.itemId}` });
        }
      }
  
      const order = new Order({
        restaurantId,
        tableNumber,
        items,
      });
  
      await order.save();
      res.status(201).json({ message: "Order placed successfully", order });
    } catch (error) {
      console.error("Error placing order:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  

// GET /api/public/restaurant/:restaurantId/orders - Get orders for the restaurant
router.get("/restaurant/:restaurantId/orders", async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const orders = await Order.find({ restaurantId })
      .populate("items.itemId") // Populate menu items in the order
      .lean();

    if (orders.length === 0) {
      return res
        .status(404)
        .json({ message: "No orders found for this restaurant" });
    }

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
