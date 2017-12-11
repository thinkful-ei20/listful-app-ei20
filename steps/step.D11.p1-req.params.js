'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const items = require('./data/items');
const app = express();

app.use(express.static('public')); // static list page

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); // client uses basic HTML form submit


app.get('/api/items', (req, res) => {
  console.log('Show a list of items');
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  console.log('Show a single item');
  const item = items.find((obj) => obj._id === req.params.id);
  res.json(item);
});

app.post('/api/items', (req, res) => {
  console.log(`Create a specific item ${req.body.name}`);
  const newItem = {
    _id: items.length,
    name: req.body.name
  };
  const updated = items.push(newItem);
  res.json(updated);
});

// listen for requests :)
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
