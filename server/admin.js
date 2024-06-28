// import * as admin from "firebase-admin";
const admin = require('firebase-admin');




// const firebase_private_key_b64 = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g,'\n');
// const firebase_private_key = String(firebase_private_key_b64);

admin.initializeApp({
  // credential: admin.credential.applicationDefault(),
  credential: admin.credential.cert({
    project_id: String(process.env.FIREBASE_PROJECT_ID),
    private_key: String(process.env.FIREBASE_PRIVATE_KEY),
    client_email: String(process.env.FIREBASE_CLIENT_EMAIL),
  }),

  databaseURL: "https://bank-app-68fd5-default-rtdb.firebaseio.com",
});

console.log("env.private_key:", process.env.FIREBASE_PRIVATE_KEY);

module.exports= admin; 


// var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

// module.exports= db; 


