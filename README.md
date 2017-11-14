Middleware Cors and Modules Demo
============================


This demos walks students thru several topics:

1) Starting from a simple API with just 2 endpoints
- app.get('/api/items', (req, res)...
- app.post('/api/items', (req, res)...


2) Create a logger middleware and add it inline to both endpints.
Logger logs the request and then allows the request to continue on.
Discussion:
- Middleware accepts a `request` and `response` object, and a `next` callback
- If `next()` isn't called then the request will hang.
- Notice the repetitive code, let's fix that.

3) Move the logger to `app.use(function(){...})`
Discussion:
- Now it is DRY.
- Order matters. Move app.use before, between, and after endpoints.
- Add mount point as a filter `app.use('/api', function(){...})`
- Show how it matches `/api` and logs the remainder
 
4) Add `auth` middleware to the post endpoint
Auth inspects the request and allows or prevents the request from continuing
Discussion:
- Notice how the middleware must either call `next()` or send a response.
- If it sends a response the cycle is cut short and the rest of the stack is skipped

5) Extract inline function and call reference
Discussion:
- Just a bit cleaner and easier to reuse.

6) Add Redirect middleware
Discussion:
- Request is inspected, if it matches an old URL, then redirect otherwise let continue
- Very common practice in the wild. This is an oversimplistic solution.

7) Add CORS middleware to allow 3rd party access
Access the endpoints from `localhost:8080`.
Spin up a separate server using `http-server -p 8081` and access
Discussion:
- Notice the Cross Origin error in Dev Tools
- Enable CORS, note the requests and headers in the Network tab
- CORS is a security feature implemented in browser
- `Access-Control-Allow-XXXX` headers tell the browser if it is allowed

8) Use express `cors` package
- CORS can get complex, this is a simple demo solution. IRL, use the `cors` package

9) Add Error middleware
Express has a built-in error. 
Discussion:
- Error Handling middleware uses the `(err, req, res, next)` signature
- Use it to override built-in handler and provide a better message to the user

10) Modularize the middleware
The `server.js` is getting long. Modularize the code:
- Move each function into a separate file
- Add `use strict;` and `module.exports = ...` 
- On `server.js` require each module
Discussion:
- `module.exports` gets exported.
- Can be and JS value, string, number, array, function or object
- Consistently exporting an Object is easiest, most flexible
- Be careful of using `exports`
  - `module.export === exports` at start
  - `exports.foo = 123` is OK
  - `exports = {foo: 123}` is BAD