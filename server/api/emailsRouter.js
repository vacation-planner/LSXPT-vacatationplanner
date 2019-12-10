const express = require("express");
const router = express.Router();
const events = require("../data/helpers/eventsModel");
//const axios = require("axios");
const sgMail = require('@sendgrid/mail');



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
sgMail.send(msg); 
 */

//const sgMail = require('@sendgrid/mail');
//sgMail.setApiKey(process.env.SENDGRID_API_KEY);


function sendEmail(data) {
  console.log("in sendEmail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  let userList = [];
  let vacationsId = "";
  data.forEach((user, index) => {
    userList.push(user.email);
    vacationsId = user.vacationsId;
  }); 


  let emailHtml = '<p>Greetings, you are invited to participate in planning a vacation. </p>';
  emailHtml = emailHtml + '<p></p><a href="http://localhost:3000?id='+vacationsId+'">Click to Join</a> <p>This is to verify we can send emails from our app.</p>';
  //emailHtml = emailHtml + vacationsId
  console.log("emailHtml: ", emailHtml);
  const msg2 = {
   // to: ['willieino@hotmail.com', 'willieino@gmail.com'],
    to: userList,
    from: 'vacationplannerlx@gmail.com',
    subject: 'Hello Vacation Planner Developer',
    text: 'You have been invited to go on a vacation!',
    html: emailHtml,
  };

  sgMail.sendMultiple(msg2);
} 
 
router.post('/', (req, res) => {
  const data = req.body;
  if (data) {
    events
    .get()
      .then(event => {
        sendEmail(data);  
        res.status(200).json({'message': 'Emails sent.'});
      })
      .catch(err => {
          res.status(500).json({'error': `Server responded with error: ${err}`});
      })
  }
  else {
      res.status(400).json({'error': 'Please check and send the proper email data to be inserted.'})
  }
  
});
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


router.get("/", (req, res) => {
  
  
  events
    .get()
    .then(event => {
      sendEmail();
      res.status(200).json(event);
    })
    .catch(err => {
      res.status(500).json({ error: "The users could not be retrieved." });
    }); 
});

module.exports = router;