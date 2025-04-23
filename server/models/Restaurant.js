const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brandingColor: { type: String },
  address: String,
  contactEmail: String,
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);
