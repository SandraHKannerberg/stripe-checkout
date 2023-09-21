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

    const createdDate = new Date(session.created * 1000);
    const formattedDate = createdDate.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    console.log(typeof formattedDate)

    //CREATE ORDER
    const order = {
      orderId: session.id,
      created: formattedDate,
      customer: session.customer_details.name,
      email: session.customer_details.email,
      products: line_items.data.map(item => {

        const price = item.price.unit_amount / 100;
        const quantity = item.quantity;

        return {
          product: item.description,
          price,
          currency: item.price.currency,
          quantity,
          discount: item.amount_discount / 100,
        };

      }),

      totalOrderPrice: session.amount_total / 100,
    };

    console.log("ORDER", order)
    console.log("SESSION-ID: ", req.body.sessionId)
    res.status(200).json({verified: true})

    //ARRAY OF ORDERS IN JSON-FILE
    let ordersArray = [];

    //GET THE JSON-FILE
      try {
        const fileData = fs.readFileSync(filePath, "utf8");
          ordersArray = JSON.parse(fileData);
        } catch (err) {
          console.log(err)
        }

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

const getCustomerOrders = async (req, res) => {

  try {
    const fileData = fs.readFileSync(filePath, "utf8");
    const orders = JSON.parse(fileData);

    const customerFilteredOrders = orders.filter(order => order.customer === req.session.username);

    if (customerFilteredOrders.length === 0) {

      console.log("No orders found for the customer");
      res.status(203).json("You have no orders to show");

    } else {
     
      console.log(customerFilteredOrders);
      res.status(200).json(customerFilteredOrders);
      return;
    }

  } catch (error) {
    console.error(error);
    return res.status(403).json("You don not have permissions to perform this request");
  }  
};

module.exports = {
    createCheckOutSession, 
    verifySession,
    getCustomerOrders
  };