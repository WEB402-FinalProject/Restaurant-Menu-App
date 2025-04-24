const Menu = require('../models/Menu');

// Create a menu, assigning restaurantId from the logged-in user
exports.createMenu = async (req, res) => {
  try {
    const menu = await Menu.create({
      ...req.body,
      restaurantId: req.restaurantId, // Assign the restaurantId from the logged-in user
    });
    res.json(menu);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get all menus for the logged-in user's restaurant
exports.getMenu = async (req, res) => {
  try {
    const menus = await Menu.find({
      restaurantId: req.restaurantId, // Ensure menus are associated with the user's restaurant
    });
    res.json(menus);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Get one menu (ensure it belongs to the logged-in user's restaurant)
exports.getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });

    if (String(menu.restaurantId) !== String(req.restaurantId)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    res.json(menu);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Update a menu (ensure it belongs to the logged-in user's restaurant)
exports.updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });

    if (String(menu.restaurantId) !== String(req.restaurantId)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    Object.assign(menu, req.body); // Update the menu with the provided fields
    await menu.save();
    res.json(menu);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete a menu (ensure it belongs to the logged-in user's restaurant)
exports.deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });

    if (String(menu.restaurantId) !== String(req.restaurantId)) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    await menu.deleteOne();
    res.json({ msg: 'Menu deleted' });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

  exports.getMenusByCategory = async (req, res) => {
    try {
      const categoryId = req.params.categoryId;
      const menus = await Menu.find({ category: categoryId }).populate('category', 'name');
      res.json(menus);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
