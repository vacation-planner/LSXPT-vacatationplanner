const express = require("express");
const router = express.Router();
const stripe = require("../constants/stripe");

router.post("/", async (req, res) => {

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500,
    currency: 'usd'
  });

  // Send publishable key and PaymentIntent details to client
  res.send({
    clientSecret: paymentIntent.client_secret
  });

});

module.exports = router;