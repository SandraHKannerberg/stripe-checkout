const express = require('express')
const { registerNewCustomer } = require('./customer.controller');
const customerRouter = express.Router()

  .post('/customers', registerNewCustomer)

module.exports = { customerRouter };