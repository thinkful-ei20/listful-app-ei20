'use strict';

// ===== REQUIRES =====
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const demoLogger = require('./middleware/demoLogger');
const itemsRouter = require('./routers/itemsRouter');
const { PORT } = require('./config');

// ===== INSTANTIATE APP =====
const app = express();

// ===== COMMON MIDDLEWARE =====
// app.use(demoLogger);
app.use(morgan('common', {skip: () => process.env.NODE_ENV === 'test'}));
app.use(express.static('public')); // serve static files
app.use(cors()); // enable cors support
app.use(bodyParser.json()); // parse JSON body

// ===== MOUNT ROUTERS =====
app.use('/api/items', itemsRouter);

// ===== MOUNT ERROR HANDLERS =====
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// ===== APP LISTEN =====
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.info(`App listening on port ${server.address().port}`);
  }).on('error', err => {
    console.error(err);
  });
}

module.exports = app; // export app for testing
