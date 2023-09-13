const { initStripe } = require('../../stripe');
const stripe = initStripe();
const fs = require("fs");
const path = require("path");
const filePath = path.join("data", "orders.json")


const CLIENT_URL = 'http://localhost:5173'

//SEND CART TO STRIPE
const createCheckOutSession = async (req,res) => {

    try {
        //PAYMENT BEGINS - START A SESSION
        const session = await stripe.checkout.sessions.create({

            line_items: req.body.items.map((item) => {
              return {
                price: item.product,
                quantity: item.quantity,
              };
            }),

            customer: req.session.id,
            mode: 'payment',
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL,
            payment_method_types: ['card'],
            allow_promotion_codes: true,
            currency: 'sek'
        });

        //SEND BACK THE URL AND SESSION ID
        res.status(200).json({url: session.url, sessionId: session.id})
        
    } catch (error) {
        console.log(error.message)
        res.status(400).json("ERROR: Something went wrong with the checkout")
    }
}

//VERIFY SESSION
const verifySession = async (req, res) => {

  try {

    //RETRIEVE SESSION FROM STRIPE
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);

    //CHECK PAYMENT STATUS
    if(session.payment_status !== "paid") {
      return res.status(400).json({ verified: false});
    }

    //SUCCESSFULL PAYMENT
    const line_items = await stripe.checkout.sessions.listLineItems(req.body.sessionId);
    
    //CREATE ORDER
    const order = {
      created: session.created,
      customer: session.customer_details.name,
      products: line_items.data.map(item => {

        const price = item.price.unit_amount / 100;
        const quantity = item.quantity;
        const totalPricePerProduct = price * quantity;

        return {
          product: item.description, //product title
          price,
          currency: item.price.currency,
          quantity,
          totalPricePerProduct,
        };

      }),
      totalOrderPrice: line_items.data.reduce((acc, item) => {
        const price = item.price.unit_amount / 100;
        const quantity = item.quantity;
        return acc + price * quantity;
      }, 0),
    };

    //logiken att spara till json-filen skrivs här
    console.log("ORDER", order)
    console.log("SESSION-ID: ", req.body.sessionId)
    res.status(200).json({verified: true})


    let ordersArray = []

    try {
      ordersArray.push(order);
      fs.writeFileSync(filePath, JSON.stringify(ordersArray, null, 2));
      res.json({order})

    } catch (error) {
    res.status(500).json({ error: error.message});
    }

  } catch (error) {
    console.error(error.message)
  }
}

const getOrders = async (req, res) => {

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const orders = JSON.parse(fileData)

    console.log(orders);
    
    res.json(orders);
    return;
  } catch (error) {
    console.error(error);
    return res.status(404).json("Something went wrong");
  }  
};


module.exports = {
    createCheckOutSession, 
    verifySession,
    getOrders
  };