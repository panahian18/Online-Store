const express = require("express");
const app = express();
const bodyParser = require("body-parser");


const productRoutes = require("./api/routes/products");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes that will handle the requests
app.use("/products", productRoutes);


module.exports = app;
