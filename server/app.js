const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const { productRouter } = require("./resources/product/product.router");
const { customerRouter } = require("./resources/customer/customer.router");

const app = express()

//Middlewares
app.use(cors({
    origin: '*'
}))
app.use(express.json())
app.use(bodyParser.json()); 

// Add routers
app.use("/api", productRouter);
app.use("/api", customerRouter);

module.exports = { app }