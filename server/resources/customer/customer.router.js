const express = require('express')
const { registerNewCustomer, getAllCustomers, customerLogIn } = require('./customer.controller');

const customerRouter = express.Router()

  .post('/customers/register', registerNewCustomer)
  .get('/customers', getAllCustomers)
  .post('/customers/login', customerLogIn)

module.exports = { customerRouter };