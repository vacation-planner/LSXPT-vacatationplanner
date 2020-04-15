const express = require("express");
const router = express.Router();
const secondaryUsers = require("../data/helpers/secondaryUsersModel");
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";


/* module.exports = router => {
    //router.get("/");   
    //router.get("/vacations/:vacationsId", getByVacationsId);
    //router.get("/:id", id);
    //router.get("/:email", email);
    //router.post("/");
    router.delete("/:id", recordId)
}; */

router.get("/", async (req, res) => {
 await   secondaryUsers
      .get()
      .then(secondaryUser => {
        res.status(200).json(secondaryUser);
      })
      .catch(err => {
        res.status(500).json({ error: "The users could not be retrieved." });
      });
  });

//Get All users for vacation ID
  router.get('/vacations/:vacationsId', async (req, res) => {
    const {vacationsId} = req.params; 
    await secondaryUsers.getByVacationsId(vacationsId).then(vacation => {
        if (vacation) {
            res.status(200).json(vacation);
        }
        else {
            res.status(400).json({'error': 'No vacation by that id.'});
        }
    }) 
})  

//Get All vacations for email
router.get('/:id', async (req, res) => {
    const {id} = req.params;
 await   secondaryUsers.getById(id).then(vacationData => {
        if (vacationData) {
            res.status(200).json(vacationData);
        }
        else {
            res.status(400).json({'error': 'No vacations associated with that email address'});
        }
    })
})

//Add secondaryUser record
router.post('/', (req, res) => {
    const record = req.body;
    if (record.firstName && record.lastName && record.email && record.vacationsId) {
    //if (record.length) {
        secondaryUsers
        .insert(record)
        .then(record => {
          res.status(201).json({ id: record[0] });
        })
        .catch(err => {
          res.status(500).send(err);
        });
    } else {
        res.status(400).json({'error': 'User full name, email address and Vacation ID must be provided.'})
    }
})

//Delete secondaryUser record
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    if (id) {
        await secondaryUsers.remove(id).then(response => {
            res.status(200).json({'message': 'Secondary User deleted.'});
        })
        .catch(err => {
            res.status(404).json({'error': `Server responded with error: ${err}`});
        })
    }
});


module.exports = router;

