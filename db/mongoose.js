const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const envFilePath = path.resolve(__dirname, "../.env");

dotenv.config({ path: envFilePath });

// // Check if environment variables are loaded correctly
// console.log("Environment variables:", process.env);

// MongoDB connection details
const dbProtocol = process.env.DB_PROTOCOL;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const dbName = process.env.DB_NAME;

// Build the connection string
const dbConnectionString = `${dbProtocol}://${dbHost}:${dbPort}/${dbName}`;
// console.log("MongoDB Connection String:", dbConnectionString);

// Connect to the database
mongoose
  .connect(dbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, 
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
  
  