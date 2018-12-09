const express = require('express');
const admin = require("firebase-admin");
const helmet = require('helmet');
const serviceAccount = require('./serviceAccountKey.json');
const cacheFunc = require('./helpers/cache');

// Cache Variables
const groupNum = 50;
let cache = {};
let groupTotal = 0;


// Intialize App
const app = express();

// Middleware
app.use(helmet());


//Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tocca-411ab.firebaseio.com"
});

// Get a database reference to our posts
const db = admin.database();
const ref = db.ref("/User_profile");

// Get all records, separate in groups, and save locally
ref.on("value", function(snapshot) {
  let arr = snapshot.val();
  if (arr) {
    arr = arr.filter(e => e !== undefined);
    const { data, totalGroups } = cacheFunc(arr, groupNum);
    cache = data;
    groupTotal = totalGroups;
  } else {
    cache = {};
    groupTotal = 0;
  }
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});


// Endpoint for Total Number of Groups
app.get('/api/users', (req, res) => {
  if (groupTotal > 0) {
    res.json(groupTotal);
  } else {
    res.status(404).send('The number of groups was not found.');
  }
});

// Endpoint for Individual Group
app.get('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (cache[id]) {
    res.json(cache[id]);
  } else {
    res.status(404).send('The group number with the given ID was not found');
  }
});

// Launch App
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));