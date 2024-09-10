const express = require("express");
//create instance of express app
const app = express();
const routes = require("./routes");
//define port 
const port = process.env.PORT || 8080;

// use the router in your app
app.use(express.json(),routes);

// app.use(routes);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})