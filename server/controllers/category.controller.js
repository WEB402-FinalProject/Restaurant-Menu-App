const Category = require('../models/Category');

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.json(category)
  } catch (err) {
    res.status(500).send(err.message);
  }
};
exports.getCategories = async (req, res) => {
    try {
      const categories = await Category.find()
      res.json(categories)
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
  
  exports.getCategoryById= async (req, res) => {
    try {
      const category = await Category.findById(req.params.id)
      if (!category) return res.status(404).json({ message: 'Category not found' });
        res.json(category)
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  exports.updateCategory= async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, {new: true})
      
        res.json(category)
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  exports.deleteCategory= async (req, res) => {
    try {
    await Category.findByIdAndDelete(req.params.id)
        res.json({msg: 'category deleted'})
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
