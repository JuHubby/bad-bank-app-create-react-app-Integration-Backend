var express = require("express");
var app = express();
var cors = require("cors");
var dal = require("./dal.js");
const dbAdmin = require("./admin.js");
// node -r dotenv/config .
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json({ limit: "10mb" }));

//serve static files
app.use(express.static('../client/build'));
app.use(cors());

//example test
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

// create user account
app.post("/account/create", function (req, res) {
  const email = req.body.email;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const balance = req.body.balance;

  // check if account exists
  dal.find(email).then((users) => {
    // if user exists, return error message
    if (users.length > 0) {
      console.log("User already in exists from Back end");
      res.send("User already in exists");
    } else {
      // else create user
      dal.create(name, lastName, email, password, balance).then((user) => {
        console.log("Hello from Create: " + JSON.stringify(user));
        res.send(user);
      });
    }
  });
});

// login user
app.post("/account/login", function (req, res) {
  dal.find(req.body.email).then((user) => {
    // if user exists, check password
    if (user.length > 0) {
      if (user[0].password === req.body.password) {
        console.log("user0" + user[0]);
        console.log(user[0]);
        res.send(user[0]);
      } else {
        console.log("Login failed: wrong password from back end");
        res.send("Login failed: wrong password");
      }
    } else {
      console.log("Login failed: user not found");
      res.send("Login failed: user not found");
    }
  });
});

// find user account
app.get("/account/find/:email", function (req, res) {
  dal.find(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// find one user by email - alternative to find
app.get("/account/findOne/:email", function (req, res) {
  dal.findOne(req.params.email).then((user) => {
    console.log(user);
    res.send(user);
  });
});

// update - deposit/withdraw amount
app.get("/account/update/:email/:amount", function (req, res) {
  var amount = Number(req.params.amount);

  dal.update(req.params.email, amount).then((response) => {
    console.log("Hi from update amount url back-end: " + response);
    console.log(response);
    res.send(response);
  });
});

app.get("/account/all", function (req, res) {
  dal.all().then((docs) => {
    console.log("hi from getAll:" + JSON.stringify(docs));
    res.send(docs);
  });
});

app.listen(3001, function () {
  console.log("Runing on port 3001!");
});
