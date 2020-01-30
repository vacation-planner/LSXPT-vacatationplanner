const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
// probably should put these keys in env
    ? 'sk_test_QaMreRWGOmBAJroixHITF1fV00VXRQSxsN'
    : 'sk_test_QaMreRWGOmBAJroixHITF1fV00VXRQSxsN';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;