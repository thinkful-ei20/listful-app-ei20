'use strict';

/**
 * DISCLAIMER:
 * The examples shown below are superficial tests which only check the API responses.
 * They do not verify the responses against the data in the database. We will learn
 * how to crosscheck the API responses against the database in a later exercise.
 */
const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');

const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality Check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});

describe('System setup', function () {

  it('NODE_ENV should be "test"', function () {
    expect(process.env.NODE_ENV).to.equal('test');
  });

  it('Express App should have correct methods', function () {
    expect(app).to.have.property('listen');
  });

});

describe('Basic Express setup', function () {

  // let server; // define server at higher scope so it is available to chai.request()

  // before(function () {
  //   return app.listenAsync()
  //     .then(instance => server = instance); // set server instance
  // });

  // after(function () {
  //   return server.closeAsync();
  // });

  describe('Express static', function () {

    it('GET request "/" should return the index page', function () {
      return chai.request(app).get('/')
        .then(function (res) {
          expect(res).to.exist;
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });

  });

  describe('404 handler', function () {

    it('should respond with 404 when given a bad path', function () {
      return chai.request(app)
        .get('/DOES/NOT/EXIST')
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });
});

describe('Items routes', function () {

  let server = app; // define server at higher scope so it is available to chai.request()

  // before(function () {
  //   return app.listenAsync()
  //     .then(instance => server = instance); // set server instance
  // });

  // after(function () {
  //   return server.closeAsync();
  // });

  describe('GET /api/items', function () {

    it('should return the default of 10 items ', function () {
      return chai.request(app)
        .get('/api/items')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(10);
        });
    });

    it('should return a list with the correct right fields', function () {
      return chai.request(app)
        .get('/api/items')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(10);
          res.body.forEach(function (item) {
            expect(item).to.be.a('object');
            expect(item).to.include.keys('id', 'name', 'checked');
          });
        });
    });

    it('should return correct search results for a valid query', function () {
      return chai.request(app)
        .get('/api/items?name=Apples')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(1);
          expect(res.body[0]).to.be.an('object');
          expect(res.body[0].id).to.equal(1000);
          expect(res.body[0].name).to.equal('Apples');
          expect(res.body[0].checked).to.be.false;
        });
    });

    it('should return an empty array for an incorrect query', function () {
      return chai.request(app)
        .get('/api/items?name=FooBars')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(0);
        });
    });

  });

  describe('GET /api/items/:id', function () {

    it('should return correct items', function () {
      return chai.request(app)
        .get('/api/items/1000')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('id', 'name', 'checked');
          expect(res.body.id).to.equal(1000);
          expect(res.body.name).to.equal('Apples');
          expect(res.body.checked).to.be.false;
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      return chai.request(app)
        .get('/api/items/9999')
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });

  describe('POST /api/items', function () {

    it('should create and return a new item when provided valid data', function () {
      const newItem = {
        'name': 'Zucchini',
        'checked': false
      };
      return chai.request(app)
        .post('/api/items')
        .send(newItem)
        .then(function (res) {
          expect(res).to.have.status(201);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'name', 'checked');
          expect(res.body.id).to.equal(1010);
          expect(res.body.name).to.equal(newItem.name);
          expect(res.body.checked).to.equal(newItem.checked);
          expect(res).to.have.header('location');
        });
    });

    it('should return an error when missing "name" field', function () {
      const newItem = {
        'checked': false
      };
      return chai.request(app)
        .post('/api/items')
        .send(newItem)
        .then(res => {
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Missing `name` in request body');
        });
    });

  });

  describe('PUT /api/items/:id', function () {

    it('should replace entire item', function () {
      const item = {
        'name': 'Raisins'
      };
      return chai.request(app)
        .put('/api/items/1005')
        .send(item)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'name');
          expect(res.body).to.not.include.keys('checked');
          expect(res.body.id).to.equal(1005);
          expect(res.body.name).to.equal(item.name);
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      const item = {
        'name': 'Raisins'
      };
      return chai.request(app)
        .put('/api/items/9999')
        .send(item)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });

  describe('PATCH /api/items/:id', function () {

    it('should update item with requested fields', function () {
      const item = {
        checked: true
      };
      return chai.request(app)
        .patch('/api/items/1004')
        .send(item)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'name', 'checked');
          expect(res.body.id).to.equal(1004);
          expect(res.body.name).to.equal('Eggplant');
          expect(res.body.checked).to.equal(true);
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      const item = {
        'name': 'Raisins'
      };
      return chai.request(app)
        .patch('/api/items/9999')
        .send(item)
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });

  describe('DELETE  /api/items/:id', function () {

    it('should delete an item by id', function () {
      return chai.request(app)
        .delete('/api/items/1005')
        .then(function (res) {
          expect(res).to.have.status(204);
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      return chai.request(app)
        .delete('/api/items/DOESNOTEXIST')
        .then(res => {
          expect(res).to.have.status(404);
        });
    });

  });

});
