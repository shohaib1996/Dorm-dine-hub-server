const express = require("express");
const stripe = require('../../api/stripe/stripe')
const router = express.Router()

router.post('/create-payment-intent', async (req, res) => {
    const { price } = req.body;
    const amount = parseInt(price * 100);
    console.log(amount, 'amount inside the intent')

    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
        payment_method_types: ['card']
    });
    // console.log(paymentIntent);

    res.send({
        clientSecret: paymentIntent.client_secret
    })
});


module.exports = router