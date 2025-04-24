const Table = require("../models/Table");

// Create a table, assigning restaurantId from the logged-in user
// Assuming body has { number: 5 }
exports.createTable = async (req, res) => {
  try {
    const { tableNumber, seatingCapacity } = req.body;

    // Ensure data is received
    if (!tableNumber || !seatingCapacity) {
      return res.status(400).json({ message: "Table number and seating capacity are required" });
    }

    // Create the new table, associating it with the restaurantId from the request
    const newTable = new Table({
      tableNumber,
      seatingCapacity,
      restaurant: req.restaurantId, // Assuming req.restaurantId is set correctly
    });

    // Save the new table to the database
    await newTable.save();

    // Respond with the created table
    res.status(201).json(newTable);
  } catch (error) {
    console.error("Error creating table:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tables for the logged-in user's restaurant
exports.getTables = async (req, res) => {
  try {
    const tables = await Table.find({ restaurant: req.restaurantId }).lean({ virtuals: true });
    res.json(tables);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};

// Get one table (ensure it belongs to the logged-in user's restaurant)
exports.getTableById = async (req, res) => {
  try {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: "Table not found" });

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
    if (!table) return res.status(404).json({ message: "Table not found" });

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
    if (!table) return res.status(404).json({ message: "Table not found" });

    if (String(table.restaurant) !== String(req.restaurantId)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    await table.deleteOne();
    res.json({ msg: "Table deleted" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
