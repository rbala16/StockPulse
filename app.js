const express = require("express");
//create instance of express app
const app = express();
//define port 
const port = process.env.PORT || 8080;
//define router in your app
const routes = require("./routes/index");

// use the router in your app
app.use(express.json(),routes);  // Handles JSON request bodies
// app.use(routes);          // Apply your routes


// app.use(routes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})