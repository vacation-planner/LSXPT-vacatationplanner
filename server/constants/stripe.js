const configureStripe = require('stripe');


const stripe = configureStripe("sk_test_KXdJP0zQXms8Ygufnu6NjCON00CMA7A4QB");

module.exports = stripe;