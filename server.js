'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/api/items', (req, res) => {
  res.send('Show a list of items');
});

app.post('/api/items', (req, res) => {
  res.send(`Create a specific item ${req.body.name}`);
});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));