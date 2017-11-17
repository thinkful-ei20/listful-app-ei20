'use strict';

const express = require('express');
const demoAuth = require('../middleware/demoAuth');
const router = express.Router();

// ===== ITEMS ======
const items = require('../db/storage')('items');

router.get('/', (req, res) => {
  // console.log('Show a list of items');
  const query = req.query;
  const list = items.getList(query);
  res.json(list); 
});

router.get('/:id', (req, res) => {
  // console.log(`Return a single item ${req.params.id}`);
  const id = req.params.id;
  res.json(items.getOne(id));
});

router.post('/', (req, res) => {
  // console.log(`Create an item: ${req.body}`);
  const item = req.body;
  const newItem = items.addOne(item);
  res.location(`/api/items/${newItem.id}`).status(201).json(newItem);
});

router.put('/:id', (req, res) =>{
  // console.log(`Update an item: ${req.params.id}`);
  const id = req.params.id;
  const item = req.body;
  res.json(items.modOne(id, item));
});

router.delete('/:id', (req, res) => {
  // console.log(`Delete a single item: ${req.params.id}`);
  const id = req.params.id;
  items.delOne(id);
  return res.sendStatus(204);
});

module.exports = router;

// ===== SEED DATABASE =====
// Seed the dummy database
items.addOne({ name: 'Apples' });
items.addOne({ name: 'Bananas' });
items.addOne({ name: 'Cheries' });
items.addOne({ name: 'Dates' });
items.addOne({ name: 'Elderberry' });
items.addOne({ name: 'Fig' });
items.addOne({ name: 'Grape' });