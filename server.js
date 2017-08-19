var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(requestLogger); // Responds on EVERYTHING
app.use(bodyParser.json()); //Responds on EVERYTHING

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// all GET requests to "/" return "views/index.html"
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// Responds to, but no next(). 
// So it effectively preventing anything else below from running
app.all('/api', function(req, res, next) {
  console.log('Responds to everything and continues')
  // res.send('Responds to everything and terminates the chain ');
  next();
});


 // Responds to EVERYTHING
 /* '/accounts'
 /accounts
 /accounts/something
 /accounts/something/somethingelse.html
 */
app.use('/accounts', doSomethingCool);

function doSomethingCool(req, res, next){
  //do something cool
  console.log('do something cool');
  next();
}


// Hits on ALL (get, post, put, delete) requests
 // Responds to all GET, POST, PUT DELETE... VERBS
 /* 
 '/accounts'
 MATCH /accounts
 NOT /accounts/1234/invoices/35
 NOT /accounts/1234
 
 '/accounts/*'
 NOT /accounts/
 MATCH /accounts/something
 MATCH /accounts/something/somethingelse
 */
app.all('/accounts/*', fooMiddleware, barMiddleware);

// req.params.id = 1234

// GET requests to the root of the server
app.get('/*', (req, res, next) => {
  res.send('========== HERE ============')
  console.log('Do a filesystem and database clean up');
  next();
});

app.get('/api', (req, res, next) => {
  console.log('Responds to GET /api')
  res.send('Responds to GET /api')
});

app.post('/api', (req, res, next) => {
  console.log('Responds to POSt /api')
  res.send('Responds to POST /api')
});

// GET requests to the root of the server
app.get('/api/messages', fakeAuthenticate, (req, res, next) => {
  console.log('Responds to GET /api')
  res.send('Responds to GET /api')
});

app.post('/api/messages', (req, res, next) => {
  console.log('Responds to POSt /api')
  res.send('Responds to POST /api')
});

// listen for requests
app.listen(process.env.PORT || 8080, () => console.log(
  `Your app is listening on port ${process.env.PORT || 8080}`));

// ============= 

function requestLogger(req, res, next) {
  const logObj = {
    method: req.method,
    hostname: req.hostname,
    path: req.path,
    "content type": req.get('Content-Type'),
    query: JSON.stringify(req.query),
    body: JSON.stringify(req.body)
  }
  console.log('=== New Request ===', (new Date()).toTimeString())
  Object.keys(logObj).forEach(key => console.log(`    request ${key}: ${logObj[key]}`));
  next();
}

function fooMiddleware(req, res, next) {
  console.log('This is fooMiddleware');
  next();
}
function barMiddleware(req, res, next) {
  console.log('This is barMiddleware');
  next();
}

function fakeAuthenticate(req, res, next) {
  console.log('You are authenticated');
  next();
}
function quxMiddleware(req, res, next) {
  console.log('This is quxMiddleware');
  next();
}

// console.log(app._router.stack);  