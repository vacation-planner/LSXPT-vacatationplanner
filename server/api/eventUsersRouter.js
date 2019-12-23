const express = require("express");
const router = express.Router();
const eventUsers = require("../data/helpers/eventUsersModel");
const jwt = require("jsonwebtoken");
const secret = "shhhisthisasecret";


module.exports = router => {
  router.get("/:id", getById);
  router.get("/events/:eventsId", getByEventId);
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


/********* Get eventUsers *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.get('/', protect, (req, res) => {
router.get("/", (req, res) => {
  eventUsers
    .get()
    .then(eventUser => {
      res.status(200).json(eventUser);
    })
    .catch(err => {
      res.status(500).json({ error: "The eventUsers could not be retrieved." });
    });
});

/****** Add a eventUser ******/
// UN-COMMENT TO PROTECT THE ROUTE!
// router.post('/', protect, (req, res) => {
router.post("/", (req, res) => {
  const eventUser = req.body;
  if (eventUser) {
    eventUsers
        .insert(eventUser)
        .then(eventUser => {
            res.status(201).json({ id: eventUser.id });
    })
        .catch(err => {
            res.status(500).send(err);
    });
  }
});

/********* Get Single eventUser *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.get('/:id', protect, (req, res) => {
 router.get("/:id", (req, res) => {
  const { id } = req.params;
  eventUsers
    .getById(id)
    .then(eventUser => {
      if (eventUser) {
        res.json(eventUser);
      } else {
        res.status(404).json({
          message: "The eventUser with the specified eventUser ID does not exist."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The eventUser's information could not be retrieved." });
    });
}); 

/********* Get By Vacation Id *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.get('/:vacationId', protect, (req, res) => {
     router.get("/events/:eventsId", (req, res) => {
        const { eventsId } = req.params;
        eventUsers
          .getByEventsId(eventsId)
          .then(eventUser => {
            if (eventUser) {
              res.json(eventUser);
            } else {
              res.status(404).json({
                message: "The eventUser with the specified vacation ID does not exist."
              });
            }
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: "The eventUser's information could not be retrieved." });
          });
      }); 

/************* Update eventUser *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.put('/:id', protect, (req, res) => {
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  eventUsers
    .update(id, changes)
    .then(eventUser => {
      if (eventUser) {
        eventUsers
          .getByid(id)
          .then(event2 => {
            if (event2) {
              // If eventUser has been updated, return the updated eventUser.
              res.status(201).json(eventUser);
            } else {
              res.status(500).json({
                message: "There was an error retrieving the current eventUser."
              })
            }
          })
          .catch(err => {
          // Return an error if there's an error retrieving that current eventUser.
            res.status(500).json({
              message: "There was an error retrieving the current eventUser."
            });
          });
      } else {
        // If eventUser does not exist, return 404 error.
        res.status(404).json({
          message: "The eventUser with the specified eventUser ID does not exist."
        });
      }
    })
    .catch(err => {
      // If there's an error in the helper method or database, return a 500 error.
      res.status(500).json({
        message: `The eventUsers were updated at this time.`
      });
    });
});

/************* Delete eventUser *************/
// UNCOMMENT TO PROTECT THE ROUTE!
// router.delete('/:id', protect, (req, res) => {
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  if (id) {
    eventUsers
      .remove(id)
      .then(eventUser => {
        if (eventUser) {
          res.json({ message: "The eventUser was successfully deleted." });
        } else {
          res.status(404).json({
            message: "The eventUser with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json({ error: "The eventUser could not be removed." });
      });
  } else {
    res.status(400).json({ error: "No eventUser ID was provided." });
  }
});

module.exports = router;