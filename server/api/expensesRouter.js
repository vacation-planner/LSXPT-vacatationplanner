const express = require("express");
const router = express.Router();
const expenses = require('../data/helpers/expensesModel');
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";

router.get('/', (req, res) => {
    expenses.get()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json(`The server responded with an error of: ${err}.`)
    })
});