'use strict';

const demoAuth = function (req, res, next) {
  if (req.query.token === 12345) {
    next();
  } else {
    res.sendStatus(401);
  }
};

module.exports = demoAuth; 