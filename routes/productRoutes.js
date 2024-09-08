const express = require("express");
const {createProduct,updateProduct,getProducts} = require("../controllers/productController");

//create a new instance of an Express router
const router = express.Router();

router.post("/",createProduct);   // Create product
router.put("/:id/quantity",updateProduct);  // Update product quantit
router.get("/",getProducts);   // Get all products

module.exports = router;