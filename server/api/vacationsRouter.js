const express = require("express");
const router = express.Router();
const users = require("../data/helpers/usersModel")
const secondaryUsers = require("../data/helpers/secondaryUsersModel");
const vacations = require("../data/helpers/vacationsModel");
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";

/* TODO: Add in a JWT protection check. */
router.get('/:id', async (req, res) => {
    const {id} = req.params; 
<<<<<<< HEAD
    await vacations.getById(id).then(vacation => {
=======
//    await vacations.getByID(id).then(vacation => {
   vacations.getByID(id).then(vacation => {
>>>>>>> origin/production
        /* TODO: add in protection against showing vacations that aren't associated with the current user. */
        if (id) {
            res.status(200).json(vacation);
        }
        else {
            res.status(400).json({'error': 'No vacation by that id.'});
        }
    }) 
});

router.get('/users/all/:uid', async (req, res) => {
    const {uid} = req.params;
<<<<<<< HEAD
    await vacations.getByUserUid(uid).then(userVacations => {
=======
//    await vacations.getByUserUID(uid).then(userVacations => {
    vacations.getByUserUID(uid).then(userVacations => {
>>>>>>> origin/production
        if (userVacations) {
            res.status(200).json(userVacations);
        }
        else {
            res.status(400).json({'error': 'No vacations associated with that UID'});
        }
    })
});

/* Get all users associated with this vacation ID */
router.get('/users/:id', async (req, res) => {
    const {id} = req.params;
<<<<<<< HEAD
    await vacations.getUsersByVacId(id).then(vacUsers => {
=======
//    await vacations.getUsersByVacID(id).then(vacUsers => {
      vacations.getUsersByVacID(id).then(vacUsers => {
>>>>>>> origin/production
        if (vacUsers) {
            res.status(200).json(vacUsers);
        }
        else {
            res.status(400).json({'error': 'No users associated with that vacation ID.'});
        }
    })
});

router.post('/', async (req, res) => {
    const data = req.body;
    if (data) {
        await vacations.insert(data).then(response => {
            res.status(200).json({'message': 'Vacation added.'});
        })
        .catch(err => {
            res.status(500).json({'error': `Server responded with error: ${err}`});
        })
    }
    else {
        res.status(400).json({'error': 'Please check and send the proper vacation data to be inserted.'})
    }
    
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    if (id && changes) {
        await vacations.update(id, changes).then(response => {
            res.status(200).json({'message': 'Vacation updated.'});
        })
        .catch(err => {
            res.status(500).json({'error': `Server had an error of ${err}`});
        })
    }
    else {
        res.status(400).json({'error': 'Please check and send the proper vacation id and changes to be updated.'})
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    if (id) {
        await vacations.remove(id).then(response => {
            res.status(200).json({'message': 'Vacation deleted.'});
        })
        .catch(err => {
            res.status(404).json({'error': `Server responded with error: ${err}`});
        })
    }
});

module.exports = router;