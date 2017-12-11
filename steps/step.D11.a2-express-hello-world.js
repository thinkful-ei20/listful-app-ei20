'use strict';

const express = require('express');

const app = express();

app.get('/index.html', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/style.css', (req, res) => {
  //set headers?
  res.sendFile(__dirname + '/public/style.css');
});

app.get('/script.js', (req, res) => {
  //set headers?
  res.sendFile(__dirname + '/public/script.js');
});

// listen for requests :)
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));
