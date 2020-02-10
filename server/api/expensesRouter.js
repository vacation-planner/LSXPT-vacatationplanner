const express = require("express");
const router = express.Router();
const expenses = require('../data/helpers/expensesModel');
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";

const errString = 'The server responded with an error of: '

// Get all expenses
router.get('/', (req, res) => {
    expenses.get()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({'error': `${errString} ${err}.`})
    })
});

// Get an expense by id
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    expenses
        .getById(id)
        .then(response => {
            res
                .status(200)
                .json(response);
        })
        .catch(err => {
            res
                .status(500)
                .json({'error': `${errString} ${err}`});
        })
});

// Get expenses by user id
router.get('/user/:uid', async (req, res) => {
    const {uid} = req.params;
    expenses.getByUid(uid).then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({'error': `${errString} ${err}`});
    })
});

/********* Get By Event Id *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.get('/:vacationId', protect, (req, res) => {
    router.get("/events/:eventsId", (req, res) => {
        const { eventsId } = req.params;
        expenses
          .getByEventsId(eventsId)
          .then(expense => {
            if (expense) {
              res.json(expense);
            } else {
              res.status(404).json({
                message: "The expense with the specified event ID does not exist."
              });
            }
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The expense's information could not be retrieved." });
          });
      }); 

// Get expenses by vacation id
router.get('/vac/:id', async (req, res) => {
    const {id} = req.params;
    expenses.getByVacId(id).then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({'error': `${errString} ${err}`});
    })
});

// Edit an expense
router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const data = req.body;
    if (data) {
        await expenses.update(id, data).then(response => {
            res.status(200).json({'message': 'expense updated'});
        })
        .catch(err => {
            res.status(500).json({'error': `${errString} ${err}`})
        }) 
    }
    else {
        res.status(400).json({'error': 'Please check and send the proper expense data to be updated.'})
    }
});

// Insert an expense
router.post('/', async (req, res) => {
    const data = req.body;
    if (data) {
        await expenses.insert(data).then(response => {
            res.status(200).json({'message': 'expense added'})
        })
        .catch(err => {
            res.status(500).json({'error': `${errString} ${err}`});
        })
    }
    else {
        res.status(400).json({'error': 'Please check and send the proper expense data to be inserted.'})
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    await expenses.remove(id).then(response => {
        res.status(200).json({'message': `expense id: ${id} deleted`})
    })
    .catch(err => {
        res.status(500).json({'error': `${errString} ${err}`})
    })

});

module.exports = router;