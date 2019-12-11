//Firebase Service Account - for authentication on backend
const dotenv = require("dotenv");
const admin = require("firebase-admin");

const serviceAccount = require("./vacationplannerlx-550b0-firebase-adminsdk-jqbo3-14722dcfa3");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
 
});

/**** FIREBASE MIDDLEWARE AUTH ***/

module.exports = admin;



