const express = require("express");
const {createSupplier,getSuppliers} = require("../controllers/supplierController");
const productRoutes = require("../controllers/productController");
const supplierRoutes = require("../controllers/supplierController");
//create a new instance of an Express router
const router = express.Router();

router.use("/",createSupplier);  // Create supplier
router.use("/",getSuppliers);    // Get all suppliers

module.exports = router;