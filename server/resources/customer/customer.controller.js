const { initStripe } = require('../../stripe');
const stripe = initStripe();
const bcrypt = require("bcrypt");

async function registerNewCustomer (req, res) {

    console.log("new customer")

}

module.exports = {
    registerNewCustomer
};