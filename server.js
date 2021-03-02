const express = require("express");
const bodyParser = require("body-parser");
let calculationsArray = [];

const app = express();

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/calculations', (req, res) => {
  console.log("/calculations GET");
  res.send(calculationsArray);
}); // end /calculations GET

app.post('/calculations', (req, res) => {
  console.log(req.body);
  calculationsArray.push(req.body);
  res.sendStatus(201);
}); // end /calculations POST

// Setup port to listen for requests
const port = 5000;
app.listen(port, function () {
  console.log(`Listening on ${port}!`);
});