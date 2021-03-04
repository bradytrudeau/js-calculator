const express = require("express");
const bodyParser = require("body-parser");
const pool = require('./pool');
require('dotenv').config();

// Setup app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GET route
app.get('/calculations', (req, res) => {
  // Get last 10 calculations from the database
  const sqlText = `SELECT * FROM calculations ORDER BY "id" DESC LIMIT 10`;
  pool.query(sqlText)
      .then((result) => {
          res.send(result.rows);          
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500);
      });
}); // End GET

// POST route
app.post('/calculations', (req, res) => {
  const newCalculation = req.body.newCalculation;
  const sqlText = `INSERT INTO calculations ("all_calculations") VALUES ($1)`;

  pool.query(sqlText, [newCalculation])
      .then((result) => {
          res.sendStatus(201);
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500);
      });
}); // End POST

app.use(express.static("build"));

// Setup port to listen for requests
const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log(`Listening on ${port}!`);
});