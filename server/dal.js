
// //cofiguration with mongo 3
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://127.0.0.1:27017';
// let db = null;

// // connect to mongo
// MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('BadBankProject');
// });

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://juliethpbautista:2DyiqmBZTspgAWyH@cluster1.bnrpa0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";
console.log("uri", uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri || 'mongodb://127.0.0.1:27017', {
  const client = new MongoClient(uri, {
    serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("myprojectFinal").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    db = client.db("myprojectFinal");
    if (db) console.log('MongoDB database found');
  } catch(error) {
    console.log('error:', error);
  }
}
run();


//create user account
function create(name, lastName, email, password, balance) {
  return new Promise((resolve, reject) => {
    const collection = db.collection("users");
    const doc = { name, lastName, email, password, balance};
     collection.insertOne(doc, { w: 1 }, function (err, result) {
      err ? reject(err) : resolve(doc);
    });
  });
}

// find user account 
function find(email) {
  return new Promise((resolve, reject) => {
      const customers = db
          .collection('users')
          .find({ email: email })
          .toArray(function (err, docs) {
              err ? reject(err) : resolve(docs);
          });
  })
}

// find user account
function findOne(email) {
  return new Promise((resolve, reject) => {
      const customers = db
          .collection('users')
          .findOne({ email: email })
          .then((doc) => resolve(doc))
          .catch((err) => reject(err));
  })
}

// update - deposit/withdraw amount
function update(email, amount) {
  return new Promise((resolve, reject) => {
      const customers = db
          .collection('users')
          .findOneAndUpdate(
              { email: email },
              { $inc: { balance: amount } },
              { returnOriginal: false },
              function (err, documents) {
                  err ? reject(err) : resolve(documents);
              }
          );


  });
}

// return all users by using the collection.find method

function all() {
  return new Promise((resolve, reject) => {
    const customers = db
      .collection("users")
      .find({})
      .toArray(function (err, docs) {
        err ? reject(err) : resolve(docs);
        console.log(docs);
      });
  });
}


module.exports = { create, find, findOne, update, all };