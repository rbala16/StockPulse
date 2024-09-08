const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    SKU:{
        type:String,
        required:true,
        unique:true,
    },
    quantity:{
        type:Number,
        default:0,
    },
    price:{
        type:Number,
        required:true,
        default:0,
    },
    supplier:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Supplier'   //reference to Supplier model
    },
    lowStockThreshold: { 
        type: Number,
         default: 10 
    },
},
//Schema options
    {
        timestamps: true
    }

);

const Product = mongoose.model("Product",productSchema);

module.exports = Product;