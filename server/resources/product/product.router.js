const express = require('express')
const { getProducts } = require('./product.controller');
const productRouter = express.Router()

  .get('/products', getProducts)

module.exports = { productRouter };