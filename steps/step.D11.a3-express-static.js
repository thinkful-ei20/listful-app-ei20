'use strict';

const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public')); // static list page

// // parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false })); // client uses HTML forms

// app.post('/items/', (req, res) => {
//   res.setHeader('Content-Type', 'text/plain');
//   res.write('you posted:\n');
//   res.end(JSON.stringify(req.body, null, 2));
//   // we should really do something with this data :-)
// });

// listen for requests :)
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));

