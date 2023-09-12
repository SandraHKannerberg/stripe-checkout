const { initStripe } = require('../../stripe');
const stripe = initStripe();
const CLIENT_URL = 'http://localhost:5173'

const createCheckOutSession = async (req,res) => {
    try {
        const session = await stripe.checkout.sessions.create({

            line_items: req.body.map((item) => {
              return {
                price: item.product,
                quantity: item.quantity
              };
            }),

            customer: req.session.id,
            mode: 'payment',
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL, //Avbryter betalningen
            payment_method_types: ['card'], // Add this line for payment method types
            allow_promotion_codes: true,
        });


        res.status(200).json({url: session.url})
        console.log(session)

    } catch (error) {
        console.log(error.message)
        res.status(400).json('Det gick inte bra...')
    }

}

module.exports = {
    createCheckOutSession
  };