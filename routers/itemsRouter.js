'use strict';

const express = require('express');
const router = express.Router();

const data = require('../db/items');
const fakeDB = require('../db/fakedb');
const items = fakeDB.initialize(data);

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
  const { name, checked } = req.body;
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  const item = items.create({ name, checked });
  res.location(`http://${req.headers.host}/items/${item.id}`).status(201).json(item);
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;

  const toUpdate = {};
  const updateableFields = ['name', 'checked'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  if (!toUpdate.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  const item = items.findByIdAndReplace(id, toUpdate); // replace
  if (!item) { return next(); }
  res.json(item);
});

router.patch('/:id', (req, res, next) => {
  const id = req.params.id;

  const toUpdate = {};
  const updateableFields = ['name', 'checked'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  if (!toUpdate.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const item = items.findByIdAndUpdate(id, toUpdate); // update
  if (!item) { return next(); }
  res.json(item);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  const result = items.findByIdAndRemove(id);
  if (!result) { return next(); }
  res.sendStatus(204);
});

module.exports = router;
