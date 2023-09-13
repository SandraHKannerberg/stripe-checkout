const { initStripe } = require('../../stripe');
const stripe = initStripe();
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const filePath = path.join("data", "customers.json")


//REGISTER NEW CUSTOMER
async function registerNewCustomer(req, res) {

    const { username, password, email } = req.body;

    //ARRAY OF CUSTOMERS IN JSON-FILE
    let customersArray = [];

    //GET THE JSON-FILE
    try {
        const fileData = fs.readFileSync(filePath, "utf8");
        customersArray = JSON.parse(fileData);
        } catch (err) {
            console.log(err)
        }
    
    //CHECK IF THE CUSTOMER ALREADY EXISTS
        const existingCustomer = customersArray.find((customer) => customer.username === username || customer.email === email)

        if(existingCustomer) {
            return res.status(409).json({Message: "Error - The customer already exists"})
        }

    //REGISTER THE NEW CUSTOMER IN STRIPE
    try {
        const customerStripe = await stripe.customers.create({
            email: email,
            name: username
        }) //ska jag ha med ERROR HANDLER FROM STRIPE?????

        //HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        //NEW CUSTOMER OBJECT
        const newCustomer = {
            id: customerStripe.id,
            email: customerStripe.email,
            username,
            password: hashedPassword,
        };

        //IF THE CUSTOMER DOESN'T EXISTS PUSH TO THE ARRAY AND UPDATE THE CUSTOMERS JSON-FILE
        customersArray.push(newCustomer);
        fs.writeFileSync(filePath, JSON.stringify(customersArray, null, 2));
        res.json({newCustomer})
            } catch (error) {
        res.status(500).json({ error: error.message});
        }
}


async function customerLogIn (req, res) {
    const { username, password } = req.body;

    try{
        const fileData = fs.readFileSync(filePath, "utf8");
        const customersArray = JSON.parse(fileData);

        const customer = customersArray.find((customer) => customer.username === username)

        if(!customer) {
            return res.status(404).json({Message: "Error - Customer not found"});
        }

    const correctPassword = await bcrypt.compare(password, customer.password);

    if(correctPassword) {
        delete customer.password; //Delete password before saving in a session
        req.session = customer; // Save info about the customer to the session (an encrypted cookie stored on the client)
        console.log(req.session);
        res.status(200).json({Message: "Successfully logged in", customer: {username: customer.username, email: customer.email}});
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
    console.log("Successfully logged out");
  }
  
  async function authorize (req, res) {
    if (!req.session.id) {
      return res.status(401).json("You are not logged in");
    }
    return req.session,
    res.status(200).json(req.session);
  }

module.exports = {
    registerNewCustomer,
    customerLogIn,
    customerLogOut,
    authorize
};