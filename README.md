Listful App
============================

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






introduce environments, env vars and process.env and development, test and production 
  - update `bash_profile` with `NODE_ENV=development`
  - update `config.js` with `process.env.PORT || 8080;`
  - add `cross-env` package and update package.json `scripts.test` property
    - `"test": "cross-env NODE_ENV=test mocha"`
  
Wrap app.listenAsyc in `if (require.main === module) {  }`
  
Add Mocha/Chai tests
  
- Update morgan
```
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'common', {
  skip: () => process.env.NODE_ENV === 'test'
}));
```

add destroy() method to simDB

Implement CICD



curl -X GET http://localhost:8080/v1/items


curl -X GET http://localhost:8080/v1/items/1003



curl -X POST http://localhost:8080/v1/items -H 'Content-Type: application/json' -d '{
"name": "Peaches", "checked": false}'

curl -X GET http://localhost:8080/v1/items



curl -X PUT http://localhost:8080/v1/items/1005 -H 'Content-Type: application/json' -d '{
"name": "Watermelon"}'

curl -X GET http://localhost:8080/v1/items/1005




curl -X PATCH http://localhost:8080/v1/items/1007 -H 'Content-Type: application/json' -d '{
"name": "Oranges"}'

curl -X GET http://localhost:8080/v1/items/1007




curl -X DELETE http://localhost:8080/v1/items/1009

curl -X GET http://localhost:8080/v1/items/1009