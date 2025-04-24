const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
  },
  seatingCapacity: {
    type: Number,
    required: true,
  },
  tableType: {
    type: String,
    enum: ['normal', 'vip', 'outdoor', 'private'],
    default: 'normal',
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
