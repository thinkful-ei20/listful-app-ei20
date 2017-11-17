'use strict';

const express = require('express');

const port = 8080;

const app = express();

app.get("/", (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/mail/', (request, response) => {
  response.json({message: 'Received!'});
});

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});