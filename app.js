const express = require("express");
//create instance of express app
const app = express();
//define port 
const port = process.env.PORT || 8080;

// //use router in your app
// const router = require("./middleware/router");

// use the router in your app
app.use(express.json());

// Routes
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
app.use('/api/products', productRoutes);
app.use('/api/suppliers', supplierRoutes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})