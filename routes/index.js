const express = require("express");
const apiRoutes = require("./api");
//create a new instance of an Express router
const router = express.Router();

router.use("/api",apiRoutes);

module.exports = router;