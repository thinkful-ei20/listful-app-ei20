Listful App
============================

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