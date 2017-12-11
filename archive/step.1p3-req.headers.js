'use strict';

const express = require('express');

const app = express();


app.get('/api/trucks/:make/', (req, res) => {
  
  console.log(req.params);
  
  const {make, model} = req.params;
  res.json({type: 'trucks', make, model} );
});

app.get('/api/cars/:make/', (req, res) => {
  
  console.log(req.params);
  
  const {make, model} = req.params;
  res.json({make, model} );
});

app.get('/api/:make/:model/:year', (req, res) => {
  
  console.log(req.params);
  
  const {make, model, year} = req.params;
  
  
  res.json({make, model, year} );
});

// listen for requests :)
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
