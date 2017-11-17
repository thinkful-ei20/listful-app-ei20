
'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());

app.get('/api/items', (req, res) => {
  res.send('Show a list of items');
});

app.post('/api/items', (req, res) => {
  res.send(`Create a specific item ${req.body.name}`);
});

app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));

  

'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/:make', (req, res) => {
  const { make } = req.params;
  res.send(`list of ${make} models`);
});

app.get('/api/:make/:model', (req, res) => {

  console.log(req.query);

  console.log(req.get('Host'));

  const { model } = req.params;
  res.send(`<b>list of ${model} years</b>`);
});


app.get('/api/:make/:model/:year', (req, res) => {
  console.log(req.params);

  

  // long hand version
  // const model = req.params.model;
  // const year = req.params.year;
  // const make = req.params.make;

  // short hand version
  const { model, year, make } = req.params;

  res.send(`details of the ${year} ${model} ${make}`);
});

app.post('/api/:make/:model/:year/comments', (req, res) => {
  console.log(req.body);

  console.log('cookies', req.cookies);

  const { model, year, make } = req.params;

  res.send(`insert comment for ${year} ${model} into the DB`);
});


// app.get('/api/:make/:model/:year', (req, res) => {

//   console.log(req.params);
//   // const make = req.params.make;
//   // const model = req.params.model;
//   // const year = req.params.year;

//   const {make, model, year} = req.params;

//   // res.json( { make:make, model:model, year:year } );
//   res.json( { make, model, yr: year } );
// });


// listen for requests :)
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
