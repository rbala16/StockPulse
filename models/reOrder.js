const mongoose = require("mongoose");

const reorderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  SKU: {
    type: String,
    required: true,
    unique: true,
  },
  quantityOrdered: {
    type: Number, // Quantity to reorder
    required: true,
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier", //reference to Supplier model
  },
  reorderDate: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending", // Can be 'Pending', 'Completed', or 'Cancelled'
  },
});

const Reorder = mongoose.model("Reorder", reorderSchema);

module.exports = Reorder;
