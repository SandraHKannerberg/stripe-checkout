const express = require('express')
const cors = require('cors')
const { productRouter } = require("./resources/product/product.router");

const app = express()

//Middlewares
app.use(cors({
    origin: '*'
}))
app.use(express.json())

// Add routers
app.use("/api", productRouter);

module.exports = { app }