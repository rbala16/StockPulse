const express = require("express");
const {createProduct,updateProduct,getProducts} = require("../controllers/productController");

//create a new instance of an Express router
const router = express.Router();

router.post("/",createProduct);
router.put("/:id/quantity",updateProduct);
router.get("/",getProducts);

module.exports = router;