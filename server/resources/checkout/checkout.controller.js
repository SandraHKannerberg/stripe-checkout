const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const CLIENT_URL = 'http://localhost:5173'

const createCheckOutSession = async (req,res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {price: 'price_1NmxufDbqBxej6tjFCbI8GcO', quantity: 2},
                {price: 'price_1NmxqfDbqBxej6tjzKTHgBlx', quantity: 2},
            ],
            mode: 'payment',
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL, //Avbryter betalningen
        })

        res.status(200).json({url: session.url})

    } catch (error) {
        console.log(error.message)
        res.status(400).json('Det gick inte bra...')
    }
}

module.exports = {
    createCheckOutSession
  };