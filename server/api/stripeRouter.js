const express = require("express");
const router = express.Router();
const stripe = require("../constants/stripe");

const stripeCharge = res => (stripeErr, stripeRes) => {
  if (stripeErr) {
    res.status(500).send({ error: stripeErr })
  } else {
    res.status(200).send({ success: stripeRes })
  }
}

router.post("/", (req, res) => {

    stripe.charges.create(req.body, stripeCharge(res))

});

module.exports = router;