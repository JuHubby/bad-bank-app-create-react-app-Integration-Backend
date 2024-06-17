// import * as admin from "firebase-admin";
const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://bank-app-68fd5-default-rtdb.firebaseio.com",
});

const dbAdmin = admin.database();

module.exports= dbAdmin; 

// ...

// import { initializeApp } from 'firebase-admin/app';

// initializeApp({
//   credential: applicationDefault(),
//   databaseURL: "https://bank-app-68fd5-default-rtdb.firebaseio.com",
// });

// // Initialize the default app
// const defaultApp = initializeApp(defaultAppConfig);

// or

// var admin = require("firebase-admin");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://bank-app-68fd5-default-rtdb.firebaseio.com",
// });

// module.exports = admin;
