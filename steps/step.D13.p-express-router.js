'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const demoLogger = require('./middleware/demoLogger');
const itemsRouter = require('./routers/itemsRouter');

const app = express();

// app.use(demoLogger);
app.use(morgan('common'));

app.use(express.static('public')); // serve static files
app.use(cors()); // enable cors support
app.use(bodyParser.json()); // parse JSON body

// ===== ITEMS =====
app.use('/api/items', itemsRouter);

// ===== ERROR HANDLERS =====

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ===== APP LISTEN =====
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
