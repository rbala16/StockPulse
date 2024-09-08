const Product = require("../models/product");
const mongooseConnectionFile = require("../db/mongoose");
const jwt = require("jsonwebtoken");

const express = require("express");
//create a new instance of an Express router
const router = express.Router();

//to create a unique id
const { v4: uuidv4 } = require("uuid");
//Create the product

