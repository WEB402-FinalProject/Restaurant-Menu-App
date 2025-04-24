const Category = require("../models/Category");

// Create a category, assigning restaurantId from the logged-in user
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      ...req.body,
      restaurantId: req.restaurantId,
    });
    res.json(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all categories for the logged-in user's restaurant
exports.getCategories = async (req, res) => {
  console.log(req.restaurantId);
  try {
    const categories = await Category.find({
      restaurantId: req.restaurantId,
    });
    res.json(categories);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get one category (ensure it belongs to the logged-in user's restaurant)
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (String(category.restaurantId) !== String(req.restaurantId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update a category (ensure it belongs to the logged-in user's restaurant)
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (String(category.restaurantId) !== String(req.restaurantId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    Object.assign(category, req.body);
    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a category (ensure it belongs to the logged-in user's restaurant)
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    if (String(category.restaurantId) !== String(req.restaurantId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await category.deleteOne();
    res.json({ msg: "Category deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
