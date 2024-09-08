const Product = require("../models/product");
// const mongooseConnectionFile = require("../db/mongoose");
const express = require("express");
//create a new instance of an Express router
const router = express.Router();

// //to create a unique id
// const { v4: uuidv4 } = require("uuid");

const {authenticateToken} = require("../jwt/auth");

  /***************Get all the products************************/
  router.get("/products",authenticateToken,async(req,res)=>{
    try{
        const product = await Product.find();
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
      }
  })


  /************create the product***********************/
  router.post("/products",authenticateToken,async(req,res)=>{
    try{
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({error:error.message});
      }
  });

  /**************update the product quantity********************/
  router.put("/products/:id",authenticateToken,async(req,res)=>{
   const _id = req.params.id;
   const updates = req.body;  // The fields to be updated are sent in the request body
    try{
         // Find the product by ID
    const product = await Product.findById(_id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
       // Update the quantity field with the new value
    product.quantity = req.body.quantity;
     // Save the updated product
    await product.save();
     // Respond with the updated product
      res.send(product);
 }
 catch (e) {
    res.status(400).json({ error: "Bad Request" }); // Handle validation errors or other issues
  }
  })

  module.exports = router;

