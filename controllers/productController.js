const Product = require("../models/product");
const mongooseConnectionFile = require("../db/mongoose");
const jwt = require("jsonwebtoken");

const express = require("express");
//create a new instance of an Express router
const router = express.Router();

//to create a unique id
const { v4: uuidv4 } = require("uuid");

//define secret key for signing the token
const client_secret = "abc-store-api";

//vertify token
const authenticateToken = (req, res, next) => {
    const tokenHeader = req.headers.authorization;
  
    if (!tokenHeader) {
      return res.status(401).send("Token Required!!");
    }
    const token = tokenHeader.split(" ")[1];
  
    jwt.verify(token, client_secret, async (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid token");
      }
      req.user = decoded;
      next();
    });
  };

  