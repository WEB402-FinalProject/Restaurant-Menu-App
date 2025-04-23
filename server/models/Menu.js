const mongoose = require("mongoose");

const MenuSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Menu", MenuSchema);
