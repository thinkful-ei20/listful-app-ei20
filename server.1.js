'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const data = require('./db/items');
const fakeDB = require('./db/fakedb');
const items = fakeDB(data);

const app = express();

app.use(morgan(app.get('env') === 'development' ? 'dev' : 'common', {
  skip: () => app.get('env') === 'test'
}));

app.use(express.static('public')); // serve static files

app.use(cors());
app.use(bodyParser.json()); // parse JSON body

// ===== ITEMS ROUTES =====

app.get('/items', (req, res) => {
  console.log('Return a list of items');
  const query = req.query;
  const list = items.find(query);
  res.json(list);
});

app.get('/items/:id', (req, res) => {
  console.log(`Return a single item ${req.params.id}`);
  const id = req.params.id;
  res.json(items.findById(id));
});

app.post('/items', (req, res) => {
  console.log(`Create an item: ${req.body}`);
  const item = req.body;
  const newItem = items.create(item);
  res.location(`/items/${newItem.id}`).status(201).json(newItem);
});

app.put('/items/:id', (req, res) =>{
  console.log(`Replace an item: ${req.params.id}`);
  const id = req.params.id;
  const item = req.body;
  res.json(items.findByIdAndReplace(id, item));
});

app.patch('/items/:id', (req, res) =>{
  console.log(`Update an item: ${req.params.id}`);
  const id = req.params.id;
  const item = req.body;
  res.json(items.findByIdAndUpdate(id, item));
});

app.delete('/items/:id', (req, res) => {
  console.log(`Delete a single item: ${req.params.id}`);
  const id = req.params.id;
  items.findByIdAndRemove(id);
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

