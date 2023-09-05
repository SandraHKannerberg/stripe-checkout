
const createCheckOutSession = async (req,res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {price: 'price_1NmxufDbqBxej6tjFCbI8GcO', quantity: 10},
                {price: 'price_1NmxqfDbqBxej6tjzKTHgBlx', quantity: 10},
                {price: 'price_1Nmxp3DbqBxej6tjr5dLaeWb', quantity: 10},
                {price: 'price_1NmxcIDbqBxej6tjDoRLPLRo', quantity: 10},
            ],
            mode: 'payment',
            success_url: `${CLIENT_URL}/confirmation`,
            cancel_url: CLIENT_URL, //Avbryter betalningen
        })

    } catch (error) {
        console.log(error.message)
    }

}

module.exports = {
    createCheckOutSession
  };