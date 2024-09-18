const mongoose = require("mongoose");

const reOrderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,  // Quantity to reorder
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'Pending',  // Can be 'Pending', 'Completed', or 'Cancelled'
    }
})

const ReOrder = mongoose.model("ReOrder",reOrderSchema);

module.exports = ReOrder;















