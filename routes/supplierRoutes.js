const express = require("express");
const {createSupplier,getSuppliers} = require("../controllers/supplierController");

//create a new instance of an Express router
const router = express.Router();

router.post("/",createSupplier);
router.get("/",getSuppliers);

module.exports = router;