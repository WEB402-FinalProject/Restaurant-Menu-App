const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
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
      enum: ["normal", "vip", "outdoor", "private"],
      default: "normal",
    },
    isOccupied: {
      type: Boolean,
      default: false,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Virtual field: ordering link
tableSchema.virtual("orderingLink").get(function () {
  return `http://localhost:5173/r/${this.restaurant}/t/${this.tableNumber}`;
});

// ✅ Ensure virtuals are included when converting to JSON or Object
tableSchema.set("toJSON", { virtuals: true });
tableSchema.set("toObject", { virtuals: true });

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
