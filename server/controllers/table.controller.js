const Table = require('../models/Table');

// Create a table, assigning restaurantId from the logged-in user
exports.createTable = async (req, res) => {
  try {
    const table = await Table.create({
      ...req.body,
      restaurant: req.restaurantId,
    });
    res.json(table);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all tables for the logged-in user's restaurant
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find({ restaurant: req.restaurantId });
    res.json(tables);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get one table (ensure it belongs to the logged-in user's restaurant)
exports.getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table)
      return res.status(404).json({ message: "Table not found" });

    if (String(table.restaurant) !== String(req.restaurantId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    res.json(table);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update a table (ensure it belongs to the logged-in user's restaurant)
exports.updateTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table)
      return res.status(404).json({ message: "Table not found" });

    if (String(table.restaurant) !== String(req.restaurantId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    Object.assign(table, req.body);
    await table.save();
    res.json(table);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a table (ensure it belongs to the logged-in user's restaurant)
exports.deleteTable = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table)
      return res.status(404).json({ message: "Table not found" });

    if (String(table.restaurant) !== String(req.restaurantId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await table.deleteOne();
    res.json({ msg: "Table deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
