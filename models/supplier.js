const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    Email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Supplier = mongoose.model("Supplier",supplierSchema);

module.exports = Supplier;