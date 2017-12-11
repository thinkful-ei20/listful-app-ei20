'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const demoLogger = require('./middleware/demoLogger');
const demoAuth = require('./middleware/demoAuth');

const app = express();

// app.use(demoLogger);
app.use(morgan('common'));

app.use(express.static('public')); // serve static files
app.use(cors()); // enable cors support
app.use(bodyParser.json()); // parse JSON body

// ===== ITEMS =====
const items = require('./db/storage')('items');

app.get('/api/items', (req, res) => {
  console.log('Return a list of items');
  const query = req.query;
  const list = items.getList(query);
  res.json(list); 
});

app.get('/api/items/:id', (req, res) => {
  console.log(`Return a single item ${req.params.id}`);
  const id = req.params.id;
  res.json(items.getOne(id));
});

app.post('/api/items', demoAuth, (req, res) => {
  console.log(`Create an item: ${req.body}`);
  const item = req.body;
  const newItem = items.addOne(item);
  res.location(`/api/items/${newItem.id}`).status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) =>{
  console.log(`Update an item: ${req.params.id}`);
  const id = req.params.id;
  const item = req.body;
  res.json(items.modOne(id, item));
});

app.delete('/api/items/:id', (req, res) => {
  console.log(`Delete a single item: ${req.params.id}`);
  const id = req.params.id;
  items.delOne(id);
  return res.sendStatus(204);
});

// ===== ERROR HANDLERS =====

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ===== APP LISTEN =====
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));

