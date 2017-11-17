Middleware Cors and Modules Demo
============================

This demos walks students thru several topics:

W3D1A: Node and Express Servers
-------------------------------
### Simple Node Server - Hello World

### Simple Express Server - Hello World

### Express Static Server
Discussion: 
- URL path/route can refer to a directory or file

W3D1P: Express Routes
---------------------
### 4 and 3/4 Ways to pass data
Add a ShoppingList (an array of objects) to the page
Discussion:
- URL path/route can refer to part of the application called an endpoint
- named route params
- querystring
- headers
- body (POST)

TODO: Need to work out the steps for intro request and response objects (W3D1)

W3D2A Express Middleware
------------------------

### Starter: Starting from a simple API with just 2 endpoints
- app.get('/api/items', (req, res)...
- app.post('/api/items', (req, res)...

### Logger: Create a logger middleware and add it inline to both endpints.
Logger logs the request and then allows the request to continue on.
Discussion:
- Middleware accepts a `request` and `response` object, and a `next` callback
- If `next()` isn't called then the request will hang.
- Notice the repetitive code, let's fix that.

### Move the logger to `app.use(function(){...})`
Discussion:
- Now it is DRY.
- Order matters. Move app.use before, between, and after endpoints.
- Add mount point as a filter `app.use('/api', function(){...})`
- Show how it matches `/api` and logs the remainder
 
### Our demoLogger is nice, but let's replace it with Morgan
Discussion:
- Our demologger gives you an understanding of how Morgan works.

### Auth: Add `auth` middleware to the post endpoint
Auth inspects the request and allows or prevents the request from continuing
Discussion:
- Notice how the middleware must either call `next()` or send a response.
- If it sends a response the cycle is cut short and the rest of the stack is skipped

### Extract inline function and call reference
Discussion:
- Just a bit cleaner and easier to reuse.

### Redirect: Add Redirect middleware
Discussion:
- Request is inspected, if it matches an old URL, then redirect otherwise let continue
- Very common practice in the wild. This is an oversimplistic solution.

### CORS: Add CORS middleware to allow 3rd party access
Access the endpoints from `localhost:8080`.
Spin up a separate server using `http-server -p 8081` and access
Discussion:
- Notice the Cross Origin error in Dev Tools
- Enable CORS, note the requests and headers in the Network tab
- CORS is a security feature implemented in browser
- `Access-Control-Allow-XXXX` headers tell the browser if it is allowed

### Use express `cors` package
- CORS can get complex, this is a simple demo solution. IRL, use the `cors` package

### Add Error middleware
Express has a built-in error. 
Discussion:
- Error Handling middleware uses the `(err, req, res, next)` signature
- Use it to override built-in handler and provide a better message to the user

W3D2P Node Modules
-----------------

### Modularize the middleware
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

W3D3A RESTful Guidelines
------------------------

### Add `storage` dummy database
Before we begin we need to add a dummy database to the app

### Add `storage` dummy database
Before we begin we need to add a dummy database to the app


W3D3P Express Router
--------------------


W3D4A Mocha Chai Chai-Http
--------------------------

Add config
Update server.js to export app
Create `test` directory and `items-test.js` file
Install mocha, chai and chai-http
Add console.log('hello world') to `items-test.js`
Add `"test": "mocha"` to package.json and explain scripts


# Travis and Heroku CICD setup in a nutshell

## Setup Continuous Integration with Travis CI

**Make sure your repo is ready to go**
On your local machine:
- Run `npm test` to ensure tests are working correctly locally
- Add properly configured `.travis.yml` (see below)
  ```yaml
  language: node_js
  node_js: node
  ```
- Commit and push repo to Github

**Activate Travis integration on your repo**
On Travis - activate integration:
  - Go to Profile: User (in upper-right) > Accounts
  - Click "Sync Account" 
  - Activate repo 

On GitHub - verify integration and test:
- Go to Settings > Integrations & Services
   - There should be an entry for "Travis CI" under Services
   - Click the "edit" button, then click "Test service" to test integration

On Travis:
- Watch build complete successfully :-)

# Setup Continuous Deployment to Heroku

**Install Travis and Heroku CLIs**

Install Travis CI's CLI:
- [Official Instructions] https://github.com/travis-ci/travis.rb
- Short version: `gem install travis`

Install Heroku CLI:
- [Offical Instructions](https://devcenter.heroku.com/articles/heroku-cli)
- Mac: `brew install heroku`
- Win: [Download Installer](https://cli-assets.heroku.com/heroku-cli/channels/stable/heroku-cli-x64.exe)

> Problems installing? Try the [Heroku NPM package](https://www.npmjs.com/package/heroku-cli)
`npm install -g heroku-cli`

**On Command line**
Configure `.travis.yml` to deploy to Heroku:
  - Go to project:
    - Run: `CD <YOUR PROJECT>`
  - Login to Heroku
    - Run: `heroku login` (and enter your UN/PW)
  - Create an app
    - Run: `heroku create <app-name>`
  - Login to travis
    - Run: `travis login` (and enter your UN/PW for **GitHub**)
  - Add Heroku info to `.travis.yml`, run: 
    - Run: `travis setup heroku`
    - Follow prompts, make sure the app name and repo are correct
    - Your `.travis.yml` should look like this:
    ```yaml
      language: node_js
      node_js: node
      deploy:
        provider: heroku
        api_key:
          secure: oOa1TMdgeY5+rySYW0HY30j+ot+KUqs1H...
        app: <APP-NAME-ON-HEROKU>
        on:
          repo: <GITHUB-USERNAME>/<REPO-NAME>
    ```
  - Ensure tests are still working
    - Run: `npm test` 
  - Commit and push changes to GitHub
    - Run  `git commit -am "setup CICD"`
  - Changes should deploy to GitHub > Travis CI > Heroku

**Extras** 
Add a Travis CI badge to your repo
  - On Travis CI, find your project and click on the badge
  - Change the dropdown menu to "Markdown" and copy the output
  - Add the badge code to your `readme.md` file, commit and push
  - The code looks something like this:
```md
[![Build Status](https://travis-ci.org/<USERNAME>/<REPO-NAME>.svg?branch=master)](https://travis-ci.org/<USERNAME>/<REPO-NAME>)```