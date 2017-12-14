'use strict';

const express = require('express');
const router = express.Router();

const data = require('../db/items');
const fakeDB = require('../db/fakedb');
const items = fakeDB(data);

// ===== ITEMS ======

router.get('/', (req, res) => {
  const query = req.query;
  const list = items.find(query);
  res.json(list);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const item = items.findById(id);
  if (!item) { return next(); }
  res.json(item);
});

router.post('/', (req, res, next) => {
  const item = req.body;
  if (!req.body.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  const newItem = items.create(item);
  res.location(`/items/${newItem.id}`).status(201).json(newItem);
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const item = req.body;
  const updatedItem = items.findByIdAndUpdate(id, item);  // PUT as update
  // const updatedItem = items.findByIdAndReplace(id, item); // PUT as replace
  if (!updatedItem) { return next(); }
  res.json(updatedItem);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  const result = items.findByIdAndRemove(id);
  if (!result) { return next(); }
  res.sendStatus(204);
});

module.exports = router;
