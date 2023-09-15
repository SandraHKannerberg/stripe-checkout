const { Router } = require('express');
const {
    createCheckOutSession,
    verifySession,
    getCustomerOrders
} = require('./checkout.controller');
const { auth } = require('../middlewares')


const checkOutRouter = Router()
  .post('/create-checkout-session', createCheckOutSession)
  .post('/verify-session', verifySession)
  .get('/orders', auth, getCustomerOrders)

module.exports = { checkOutRouter };