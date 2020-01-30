const cors = require("cors");
require("dotenv").config();
const express = require("express");
const db = require("./data/dbConfig");
const parser = express.json();
const server = express();
const jwt = require("jsonwebtoken");
const logger = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");
const usersRouter = require("./api/usersRouter");
const vacationsRouter = require("./api/vacationsRouter");
//const expensesRouter = require("./api/expensesRouter");
const eventsRouter = require("./api/eventsRouter");
const eventUsersRouter = require("./api/eventUsersRouter");
const emailsRouter = require("./api/emailsRouter");
const secondaryUsersRouter = require("./api/secondaryUsersRouter");
const billingRouter = require("./api/billingRouter"); //new
const stripeRouter = require("./api/stripeRouter"); //new
//const stripeRouter = require("./api/stripeRouter");
const admin = require("./data/auth/firebaseMiddleware");
//const server = require('./api/server');

server.use(cors());
server.use(express.json());
server.use(parser);
server.use(logger("tiny"));
server.use(helmet());
server.use("/api/vacations", vacationsRouter);
server.use("/api/users", usersRouter);
server.use("/api/emails", emailsRouter);
server.use("/api/billing", verifyToken, billingRouter); //new
server.use("/api/events", eventsRouter);
server.use("/api/eventUsers", eventUsersRouter);
server.use("/api/secondaryUsers", secondaryUsersRouter);
//server.use("/api/users", verifyToken, usersRouter);
//server.use("/api/expenses", expensesRouter);
server.use("/api/stripe", stripeRouter); //new
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use("/", verifyToken);

async function verifyToken(req, res, next) {
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
      return res.status(401).send("You are not authorized!");
    }
  }


const PORT = process.env.PORT || 5500;

//Server response get '/'
server.get("/", async (req, res) => {
    await res
      .status(200)
      .json({ response: "Vacation Planner LX App Successfully Launched" });
  });

server.listen(PORT, () => {
    console.log(`\n** Server is listening on port: ${PORT} **\n`);
});
