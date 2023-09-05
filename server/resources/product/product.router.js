const { Router } = require('express');
const {
  getAllProducts,
} = require('./product.controller');

const productRouter = Router()
  .get('/products', getAllProducts)

module.exports = { productRouter };