//Firebase Service Account - for authentication on backend
const dotenv = require("dotenv");
const admin = require("firebase-admin");

const serviceAccount = require("./lsxpt-vacationplanner-firebase-adminsdk-v5pc9-edde143921");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/**** FIREBASE MIDDLEWARE AUTH ***/

module.exports = admin;



/* admin.initializeApp({
  credential: admin.credential.cert(serviceAccount) */
 /*  databaseURL: "https://lsxpt-vacationplanner.firebaseio.com" */
/* }); */