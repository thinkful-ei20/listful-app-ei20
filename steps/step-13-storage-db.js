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
  res.send('Show a list of items');
});

app.post('/api/items', demoAuth, (req, res) => {
  res.send(`Create a specific item ${req.body.name}`);
});

// ===== ERROR HANDLERS =====

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ===== APP LISTEN =====
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));

// ===== SEED DATABASE =====  
// Seed the dummy database
items.addOne({ name: 'Apples' });
items.addOne({ name: 'Bananas' });
items.addOne({ name: 'Cheries' });
items.addOne({ name: 'Dates' });
items.addOne({ name: 'Elderberry' });
items.addOne({ name: 'Fig' });
items.addOne({ name: 'Grape' });

