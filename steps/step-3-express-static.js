'use strict';

const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/cars/', (request, response) => {
  response.json({message: "hello world"});
  // response.sendFile(__dirname + '/views/index.html');
});


app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});

