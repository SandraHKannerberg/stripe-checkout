const express = require('express')
const { registerNewCustomer, getAllCustomers, customerLogIn, customerLogOut, authorize } = require('./customer.controller');

const customerRouter = express.Router()

  .post("/customers/register", registerNewCustomer)
  .get("/customers", getAllCustomers)
  .post("/customers/login", customerLogIn)
  .post("/customers/logout", customerLogOut)
  .get("/customers/authorize", authorize)


module.exports = { customerRouter };