const { initStripe } = require('../../stripe');
const stripe = initStripe();
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

  console.log("SESSION-ID: ", req.body.sessionId)

  res.status(200).json({verified: true})

}


module.exports = {
    createCheckOutSession, 
    verifySession
  };