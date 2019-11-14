const express = require("express");
const router = express.Router();
const secondaryUsers = require("../data/helpers/secondaryUsersModel");
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";


module.exports = router => {
    router.get("/secondaryUsers/:vacationid", vacationById);
    router.get("/secondaryUsers/:uid", userUID);
    router.post("/secondaryUsers/");
    router.delete("/secondaryUsers/:id", recordId)
};

//Get All users for vacation ID
router.get('/:vacationid', (req, res) => {
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

//Get All vacations for user Uid
router.get('/secondaryUsers/:uid', (req, res) => {
    const {uid} = req.params;
    await secondaryUsers.getByUid(uid).then(vacationData => {
        if (vacationData) {
            res.status(200).json(vacationData);
        }
        else {
            res.status(400).json({'error': 'No vacations associated with that UID'});
        }
    })
})

//Add secondaryUser record
router.post('/secondaryUsers/', (req, res) => {
    const record = req.body;
    if (record.uid && record.vacationid) {
        secondaryUsers
        .insert(record)
        .then(record => {
          res.status(201).json({ id: record.id });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } else {
        res.status(400).json({'error': 'User UID and Vacation ID must be provided.'})
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

