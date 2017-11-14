'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const demoLogger = require('./middleware/demoLogger');
const demoAuth = require('./middleware/demoAuth');
const redirectsMap = require('./redirectsMap.json');
const demoRedirects = require('./middleware/demoRedirects');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(demoLogger);
app.use(demoRedirects(redirectsMap));
app.use(cors());

app.get('/api/items', (req, res) => {
  res.send('Show a list of items');
});

app.post('/api/items', demoAuth, (req, res) => {
  res.send(`Create a specific item ${req.body.name}`);
});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
