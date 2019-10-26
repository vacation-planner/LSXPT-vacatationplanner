const express = require("express");
const router = express.Router();
const users = require("../data/helpers/usersModel")
const secondaryUsers = require("../data/helpers/secondaryUsersModel");
const vacations = require("../data/helpers/vacationsModel");
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";

/*
module.exports = router => {
    router.get("/:id", vacationById);
    router.get("/users/:uid", vacationsByUserUID)
    router.get("/users/:id")
    router.put("/:id", update);
};
*/

/* TODO: Add in a JWT protection check. */
router.get('/:id', (req, res) => {
    const {id} = req.params; 
    await vacations.getByID(id).then(vacation => {
        /* TODO: add in protection against showing vacations that aren't associated with the current user. */
        if (id) {
            res.status(200).json(vacation)
        }
        else {
            res.status(400).json({'error': 'No vacation by that id.'})
        }
    }) 
})

router.get('/users/:uid', (req, res) => {
    const {uid} = req.params;
    await vacations.getByUserUID(uid).then(userVacations => {
        if (userVacations) {
            res.status(200).json(userVacations);
        }
        else {
            res.status(400).json({'error': 'No vacations associated with that UID'})
        }
    })
})