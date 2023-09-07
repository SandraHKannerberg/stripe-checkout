const express = require('express')
const { registerNewCustomer, getAllCustomers } = require('./customer.controller');

const customerRouter = express.Router()

  .post('/customers/register', registerNewCustomer)
  .get('/customers', getAllCustomers)

module.exports = { customerRouter };