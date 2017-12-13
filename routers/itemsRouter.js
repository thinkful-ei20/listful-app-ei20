'use strict';

const express = require('express');
const router = express.Router();

const data = require('../db/items');
const fakeDB = require('../db/fakedb');
const items = fakeDB(data);

// ===== ITEMS ======

router.get('/', (req, res, next) => {
  const query = req.query;
  const list = items.find(query);
  res.json(list);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const item = items.findById(id);
  if (!item) {next();}
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

router.put('/:id', (req, res) =>{
  const id = req.params.id;
  const item = req.body;
  res.json(items.findByIdAndUpdate(id, item));  // PUT as update
  // res.json(items.findByIdAndReplace(id, item)); // PUT as replace
});

router.patch('/:id', (req, res) =>{
  const id = req.params.id;
  const item = req.body;
  res.json(items.findByIdAndUpdate(id, item));
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  items.findByIdAndRemove(id);
  return res.sendStatus(204);
});

module.exports = router;
