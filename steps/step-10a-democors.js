'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

const demoLogger = function (req, res, next) {
  const now = new Date();
  console.log(`${now.toLocaleString()} ${req.method} ${req.url}`);
  next();
};

const demoAuth = function (req, res, next) {
  if (req.query.token === 12345) {
    next();
  } else {
    res.sendStatus(401);
  }
};

function demoCORS(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
}

app.use(demoLogger);
app.use(demoCORS);

app.get('/api/items', (req, res) => {
  res.send('Show a list of items');
});

app.post('/api/items', demoAuth, (req, res) => {
  res.send(`Create a specific item ${req.body.name}`);
});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
