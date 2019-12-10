const express = require("express");
const router = express.Router();
//const emails = require("../data/helpers/emailsModel");
//const axios = require("axios");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* const msg = {
  to: 'willieino@hotmail.com',
  from: 'test@example.com',
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg); */


//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function sendEmail() {
  const msg2 = {
    to: ['willieino@hotmail.com', 'willieino@gmail.com'],
    from: 'vacationplanner@example.org',
    subject: 'Hello Secondary user',
    text: 'You have been invited to go on a vacation!',
    html: '<p>Greetings, you are invited to participate in planning a vacation</p>',
  };

  sgMail.sendMultiple(msg2);
  
  /* try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    if (decodedToken) {
      req.body.uid = decodedToken.uid;
      return next();
    } else {
      return res.status(401).send("You are not authorized!");
    }
  } catch (e) {
    return res.status(401).send("You are no authorized!");
  } */
}