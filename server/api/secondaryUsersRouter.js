const express = require("express");
const router = express.Router();
const secondaryUsers = require("../data/helpers/secondaryUsersModel");
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";


module.exports = router => {
    router.get("/:vacationid", vacationById);
    router.get("/:id", id);
    router.get("/:email", email);
    router.post("/");
    router.delete("/:id", recordId)
};

//Get All users for vacation ID
router.get('/:vacationid', async (req, res) => {
    const {vacationid} = req.params; 
    await secondaryUsers.getByVacationId(vacationid).then(vacation => {
        if (vacation) {
            res.status(200).json(vacation);
        }
        else {
            res.status(400).json({'error': 'No vacation by that id.'});
        }
    }) 
})

//Get All vacations for email
router.get('/:email', async (req, res) => {
    const {email} = req.params;
    await secondaryUsers.getByEmail(email).then(vacationData => {
        if (vacationData) {
            res.status(200).json(vacationData);
        }
        else {
            res.status(400).json({'error': 'No vacations associated with that email address'});
        }
    })
})

//Add secondaryUser record
router.post('/secondaryUsers/', (req, res) => {
    const record = req.body;
    if (record.firstName && record.lastName && record.email && record.vacationid) {
        secondaryUsers
        .insert(record)
        .then(record => {
          res.status(201).json({ id: record.id });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } else {
        res.status(400).json({'error': 'User full name, email address and Vacation ID must be provided.'})
    }
})

//Delete secondaryUser record
router.delete('/secondaryUsers/:id', (req, res) => {
    const {id} = req.params;
    secondaryUsers.remove(id)
    .then(res => {
        res.status(200).json(res.data)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})

