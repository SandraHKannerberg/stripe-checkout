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
            return res.status(409).json({Message: "Error - The customer already exists"})
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

async function customerLogIn (req, res) {
    const { username, password } = req.body;

    try{
        const fileData = fs.readFileSync(filePath, "utf8");
        const customerData = JSON.parse(fileData);

        const customer = customerData.find((customer) => customer.username === username)

        if(!customer) {
            return res.status(404).json({Message: "Error - Customer not found"});
        }

    const correctPassword = await bcrypt.compare(password, customer.password);

    if(correctPassword) {
        delete customer.password; //Delete password before saving in a session
        req.session = customer; // Save info about the customer to the session (an encrypted cookie stored on the client)
        console.log("SessionData", req.session);
        res.json({Message: "Successfully logged in", customer: {username: customer.username, email: customer.email}});
    } else {
        res.status(401).json("Error - wrong username or password. Try again");
    }
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
}

async function customerLogOut (req, res) {
    if (!req.session.id) {
      return res.status(400).json("Cannot logout when you are not logged in");
    }
    req.session = null;
    res.status(204).json(null);
  }
  
  async function authorize (req, res) {
    if (!req.session) {
      return res.status(304).json("You are not logged in");
    }
    res.status(200).json(req.session);
  }

module.exports = {
    registerNewCustomer,
    getAllCustomers, 
    customerLogIn,
    customerLogOut,
    authorize
};