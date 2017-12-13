'use strict';

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const util = require('util');

const {PORT} = require('./config');
const itemsRouter = require('./routers/itemsRouter');

const app = express();

app.use(morgan(app.get('env') === 'development' ? 'dev' : 'common', {
  skip: () => app.get('env') === 'test'
}));

app.use(express.static('public')); // serve static files

app.use(cors());
app.use(bodyParser.json()); // parse JSON body

// ===== ITEMS ROUTES =====

app.use('/v1/items', itemsRouter);

// ===== ERROR HANDLERS =====

// 404 catch-all
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler
// Only show stacktrace if 'env' is 'development'
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (process.env.NODE_ENV === 'development') ? err : {}
  });
});

app.listenAsync = function (port) {
  return new Promise((resolve, reject) => {
    this.listen(port, function () {
      this.closeAsync = util.promisify(this.close);
      resolve(this);
    }).on('error', reject);
  });
};

// ===== APP LISTEN =====
if (require.main === module) {
  app.listenAsync(PORT)
    .then(server => {
      console.info(`Server listening on port ${server.address().port}`);
    })
    .catch(console.error);
}
module.exports = app; // Export for testing
