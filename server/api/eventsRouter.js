const express = require("express");
const router = express.Router();
const events = require("../data/helpers/eventsModel");
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";


module.exports = router => {
  router.get("/:id", getById);
  router.get("/vacation/:vacationId", getByVacationId);
  router.put("/:id", update);
  router.post("/", insert);
  router.delete("/:id", remove); 
};

/* async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization;
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken) {
      req.body.uid = decodedToken.uid;
      return next();
    } else {
      return res.status(401).send("You are not authorized!");
    }
  } catch (e) {
    return res.status(401).send("You are no authorized!");
  }
} */


/********* Get events *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.get('/', protect, (req, res) => {
router.get("/", async (req, res) => {
  await events
    .get()
    .then(event => {
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({ error: "The events could not be retrieved." });
    });
});

/****** Add a event ******/
// UN-COMMENT TO PROTECT THE ROUTE!
// router.post('/', protect, (req, res) => {
router.post("/", async (req, res) => {
  const event = req.body;
  if (event) {
    await events
        .insert(event)
        .then(response => {
          console.log(response)
            res.status(201).json({ id: event.id });
    })
        .catch(err => {
            res.status(500).send(err);
    });
  }
});

/********* Get Single event *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.get('/:id', protect, (req, res) => {
 router.get("/:id", async (req, res) => {
  const { id } = req.params;
  await events
    .getById(id)
    .then(event => {
      if (event) {
        res.json(event);
      } else {
        res.status(404).json({
          message: "The event with the specified event ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The event's information could not be retrieved." });
    });
}); 

/********* Get By Vacation Id *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.get('/:vacationId', protect, (req, res) => {
     router.get("/vacations/:vacationsId", async (req, res) => {
        const { vacationId } = req.params;
        await events
          .getByVacationsId(vacationId)
          .then(event => {
            if (event) {
              res.json(event);
            } else {
              res.status(404).json({
                message: "The event with the specified vacation ID does not exist."
              });
            }
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The event's information could not be retrieved." });
          });
      }); 

/************* Update event *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.put('/:id', protect, (req, res) => {
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  if (changes) {
  await events
    .update(id, changes)
    .then(response => {
      res.status(200).json({'message': 'expense updated'});
    })
    .catch(err => {
        res.status(500).json({'error': `Error returned: ${err}`})
    }) 
}
else {
    res.status(400).json({'error': 'Please check and send the proper expense data to be updated.'})
}
});

     /*  if (event) {
        events
          .getByid(id)
          .then(event2 => {
            if (event2) {
              // If event has been updated, return the updated event.
              res.status(201).json(event);
            } else {
              res.status(500).json({
                message: "There was an error retrieving the current event."
              })
            }
          })
          .catch(err => {
          // Return an error if there's an error retrieving that current event.
            res.status(500).json({
              message: "There was an error retrieving the current event."
            });
          });
      } else {
        // If event does not exist, return 404 error.
        res.status(404).json({
          message: "The event with the specified event ID does not exist."
        });
      }
    })
    .catch(err => {
      // If there's an error in the helper method or database, return a 500 error.
      res.status(500).json({
        message: `The events were updated at this time.`
      });
    });
}); */

/************* Delete event *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.delete('/:id', protect, (req, res) => {
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    events
      .remove(id)
      .then(event => {
        if (event) {
          res.json({ message: "The event was successfully deleted." });
        } else {
          res.status(404).json({
            message: "The event with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The event could not be removed." });
      });
  } else {
    res.status(400).json({ error: "No event ID was provided." });
  }
});

module.exports = router;