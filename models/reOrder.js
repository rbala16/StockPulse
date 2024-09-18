const mongoose = require("mongoose");

const reorderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  quantity: {
    type: Number, // Quantity to reorder
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: "Pending", // Can be 'Pending', 'Completed', or 'Cancelled'
  },
});

const Reorder = mongoose.model("Reorder", reorderSchema);

module.exports = Reorder;
