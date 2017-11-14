'use strict';

/* Note:
 - `req.path` is the path without the querystring
 - `req.url` is the url including the querystring
 */
function handleRedirect(map) {
  return function handleRedirects(req, res, next) {
    if (map[req.path]) {
      res.redirect(301, map[req.url]);
    } else {
      next();
    }
  };
}