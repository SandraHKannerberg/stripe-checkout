const { Router } = require('express');
const {
    createCheckOutSession
} = require('./checkout.controller');


const checkOutRouter = Router()
  .post('/create-checkout-session', createCheckOutSession)

module.exports = { checkOutRouter };