const { initStripe } = require('../../stripe');
const stripe = initStripe();
const CLIENT_URL = 'http://localhost:5173'

// const createCheckOutSession = async (req, res) => {
//   console.log(req.body);
//   // converting our array into the lineItems array that Stripe wants
//   const items = req.body.items;
//   console.log(items)
//   let lineItems = [];
//   // create a new array in the format that Stripe wants for us to process payments
//   items.forEach((item) => {
//     lineItems.push({ price: item.id, quantity: item.quantity, currency: 'sek' });
//   });
//   // initiate session with stripe
//   const session = await stripe.checkout.sessions.create({
//     line_items: lineItems,
//     mode: "payment",
//     success_url: `${CLIENT_URL}/confirmation`,
//     cancel_url: CLIENT_URL, //Avbryter betalningen
//   });

//   res.send(JSON.stringify({ url: session.url }));
// };

const createCheckOutSession = async (req,res) => {

  console.log(req.body)

    try {
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
            cancel_url: CLIENT_URL, //Avbryter betalningen
            payment_method_types: ['card'], // Add this line for payment method types
            allow_promotion_codes: true,
            currency: 'sek'
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

