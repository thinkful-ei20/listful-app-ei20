'use strict';

const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/api/items', function reqLogger(req, res, next) {
  const now = new Date();
  console.log(`${now.toLocaleString()} ${req.method} ${req.url}`);
  next();
}, (req, res) => {
  res.send('Show a list of items');
});

app.post('/api/items', function reqLogger(req, res, next) {
  const now = new Date();
  console.log(`${now.toLocaleString()} ${req.method} ${req.url}`);
  next();
}, (req, res) => {
  res.send(`Create a specific item ${req.body.name}`);
});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));