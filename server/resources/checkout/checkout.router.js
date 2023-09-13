const { Router } = require('express');
const {
    createCheckOutSession,
    verifySession,
    getOrders
} = require('./checkout.controller');


const checkOutRouter = Router()
  .post('/create-checkout-session', createCheckOutSession)
  .post('/verify-session', verifySession)
  .get('/orders', getOrders)

module.exports = { checkOutRouter };