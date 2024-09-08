const Supplier = require('../models/supplierModel');

const express = require("express");
//create a new instance of an Express router
const router = express.Router();

const {authenticateToken} = require("../jwt/auth");

  /***************Create a new supplier************************/
  router.post("/suppliers",authenticateToken,async(req,res)=>{
    try {
        const supplier = new Supplier(req.body);
        await supplier.save();
        res.status(201).json(supplier);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  })

    /***************Get all suppliers************************/
    router.get("/suppliers",authenticateToken,async(req,res)=>{
        try {
            const suppliers = await Supplier.find();
            res.json(suppliers);
          } catch (error) {
            res.status(400).json({ error: error.message });
          }
    })

    module.exports = router;