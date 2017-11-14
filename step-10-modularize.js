'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const demoLogger = require('./middleware/demoLogger');
const demoAuth = require('./middleware/demoAuth');
const demoRedirects = require('./middleware/demoRedirects');
const redirects = require('./redirects.json');

const app = express();

app.use(demoLogger); // Log everything
app.use(demoRedirects(redirects)); // handle redirects
app.use(express.static('public')); // serve static files
app.use(cors()); // enable cors support
app.use(bodyParser.json()); // parse JSON body

app.get('/api/items', (req, res) => {
  res.send('Show a list of items');
});

app.post('/api/items', demoAuth, (req, res) => {
  res.send(`Create a specific item ${req.body.name}`);
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
