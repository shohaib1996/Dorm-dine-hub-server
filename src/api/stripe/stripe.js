
require('dotenv').config()
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {

    process.exit(1);
}

const stripe = require("stripe")(stripeSecretKey);

module.exports = stripe