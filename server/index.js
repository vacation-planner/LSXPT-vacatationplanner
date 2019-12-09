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
const emailsRouter = require("./api/emailsRouter");
const secondaryUsersRouter = require("./api/secondaryUsersRouter")
//const stripeRouter = require("./api/stripeRouter");
//const admin = require("./data/auth/firebaseMiddleware");
//const server = require('./api/server');

server.use(cors());
server.use(express.json());
server.use(parser);
server.use(logger("tiny"));
server.use(helmet());
server.use("/api/vacations", vacationsRouter);
server.use("/api/users", usersRouter);
server.use("/api/emails", emailsRouter);
//server.use("/api/billing", verifyToken, billingRouter);
server.use("/api/events", eventsRouter);
server.use("/api/secondaryUsers", secondaryUsersRouter);
//server.use("/api/users", verifyToken, usersRouter);
//server.use("/api/expenses", expensesRouter);
//server.use("/api/stripe", stripeRouter);
server.use(parser.urlencoded({ extended: false }));
server.use(parser.json());
//server.use("/", verifyToken);


const PORT = process.env.PORT || 5500;

server.listen(PORT, () => {
    console.log(`\n** Server is listening on port: ${PORT} **\n`);
});
