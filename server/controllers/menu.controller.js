const Menu = require('../models/Menu')

exports.createMenu = async (req, res) => {
  try {
    const menu = await Menu.create(req.body)
    res.json(menu)
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.getMenu = async (req, res) => {
    try {
      const menu = await Menu.find()
      res.json(menu)
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  exports.getMenuById= async (req, res) => {
    try {
      const menu = await Menu.findById(req.params.id)
      if (!menu) return res.status(404).json({ message: 'Menu not found' });
        res.json(menu)
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  exports.updateMenu= async (req, res) => {
    try {
      const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true})
      
        res.json(menu)
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  exports.deleteMenu= async (req, res) => {
    try {
    await Menu.findByIdAndDelete(req.params.id)
        res.json({msg: 'Menu deleted'})
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