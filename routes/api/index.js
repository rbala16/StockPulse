const express = require("express");
const productRoutes = require("./productRoutes");
const supplierRoutes = require("./supplierRoutes");

//create a new instance of an Express router
const router = express.Router();

router.use("/products",productRoutes);   
router.use("/suppliers",supplierRoutes);   

module.exports = router;