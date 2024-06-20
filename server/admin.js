// import * as admin from "firebase-admin";
const admin = require('firebase-admin');


admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://bank-app-68fd5-default-rtdb.firebaseio.com",
});

module.exports= admin; 


// var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

// module.exports= db; 


