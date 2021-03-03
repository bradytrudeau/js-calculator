const express = require("express");
const bodyParser = require("body-parser");
// Empty array to hold calculations
let calculationsArray = [];

// Setup app
const app = express();

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET route
app.get('/calculations', (req, res) => {
  res.send(calculationsArray);
}); // end /calculations GET

// POST route
app.post('/calculations', (req, res) => {
  calculationsArray.unshift(req.body);
  res.sendStatus(201);
}); // end /calculations POST

// Setup port to listen for requests
const port = 5000;
app.listen(port, function () {
  console.log(`Listening on ${port}!`);
});