const express = require("express");
const router = express.Router();
const events = require("../data/helpers/eventsModel");
//const axios = require("axios");
const sgMail = require('@sendgrid/mail');


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
  emailHtml = emailHtml + '<p></p><a href="http://localhost:3000?id='+vacationsId+'">Click to Join</a> <p>This is totally not spam. .</p>';
  //emailHtml = emailHtml + vacationsId
  //console.log("emailHtml: ", emailHtml);
  const msg2 = {
  
    to: userList,
    from: 'vacationplannerlx@gmail.com',
    subject: 'Hello Vacation Planner',
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