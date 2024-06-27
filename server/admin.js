// import * as admin from "firebase-admin";
const admin = require('firebase-admin');




const firebase_private_key_b64 = Buffer.from(process.env.FIREBASE_PRIVATE_KEY_BASE64, 'base64');
const firebase_private_key = firebase_private_key_b64.toString('utf8');

admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    private_key: firebase_private_key,
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  }),

  databaseURL: "https://bank-app-68fd5-default-rtdb.firebaseio.com",
});

module.exports= admin; 


// var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

// module.exports= db; 


