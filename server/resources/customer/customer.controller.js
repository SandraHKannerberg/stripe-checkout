const { initStripe } = require('../../stripe');
const stripe = initStripe();
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const filePath = path.join("data", "customer.json")


//REGISTER NEW CUSTOMER
async function registerNewCustomer(req, res) {

    const { username, password, email } = req.body;

    //REGISTER THE NEW CUSTOMER IN STRIPE
    try {
        const customer = await stripe.customers.create({
            email: email,
            name: username
        })

        //HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        //NEW CUSTOMER OBJECT
        const newCustomer = {
            id: customer.id,
            username,
            password: hashedPassword,
            email: customer.email,
        };

        //ARRAY OF CUSTOMERS
        let customerData = [];

        try {
            const fileData = fs.readFileSync(filePath, "utf8");
            customerData = JSON.parse(fileData);
        } catch (err) {
            console.log(err)
        }

        //CHECK IF THE CUSTOMER ALREADY EXISTS
        const existingCustomer = customerData.find((customer) => customer.username === username || customer.email === email)
        if(existingCustomer) {
            return res.status(409).json({Message: "The customer already exists"})
        }

        //IF THE CUSTOMER DOESN'T EXISTS PUSH TO THE ARRAY AND UPDATE THE CUSTOMERS JSON-FILE
        customerData.push(newCustomer);
        fs.writeFileSync(filePath, JSON.stringify(customerData, null, 2));
        res.json({newCustomer})
            } catch (error) {
        res.status(500).json({ error: error.message});
        }
    }


async function getAllCustomers(req, res) {
    try {
        const customers = await stripe.customers.list({
            limit: 3,
        });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

module.exports = {
    registerNewCustomer,
    getAllCustomers
};