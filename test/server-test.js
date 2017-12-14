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
const chaiSpies = require('chai-spies');

const data = require('../db/items');
const fakeDB = require('../db/fakedb');


const expect = chai.expect;

chai.use(chaiHttp);
chai.use(chaiSpies);

describe('sanity check and setup', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('1 + 1 should equal 2', function () {
    expect(1 + 1).to.equal(2);
  });

  it('NODE_ENV should be "test"', function () {
    expect(process.env.NODE_ENV).to.equal('test');
  });

});

describe('Listful App ', function () {

  let server;
  before(function () {
    return app.listenAsync()
      .then(instance => server = instance);
  });

  beforeEach(function () {
    fakeDB.initialize(data);
  });

  afterEach(function () {
    fakeDB.destroy();
  });

  after(function () {
    return server.closeAsync();
  });

  describe('Express static', function () {

    it('GET request "/" should return the index page', function () {
      return chai.request(server)
        .get('/')
        .then(function (res) {
          expect(res).to.exist;
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });

  });

  describe('Error handler', function () {

    it('should respond with 404 when given a bad path', function () {
      const spy = chai.spy();
      return chai.request(server)
        .get('/bad/path')
        .then(spy)
        .catch(err => {
          expect(err.response).to.have.status(404);
        })
        .then(() => {
          expect(spy).to.not.have.been.called();
        });
    });

  });

  describe('GET /v1/items', function () {

    it('should return the default of 10 items ', function () {
      return chai.request(app)
        .get('/v1/items')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(10);
        });
    });

    it('should return a list with the correct right fields', function () {
      return chai.request(app)
        .get('/v1/items')
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
        .get('/v1/items?name=Apples')
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
        .get('/v1/items?name=FooBars')
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(0);
        });
    });

  });

  describe('GET /v1/items/:id', function () {

    it('should return correct items', function () {
      return chai.request(app)
        .get('/v1/items/1000')
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
      const spy = chai.spy();
      return chai.request(server)
        .get('/v1/items/9999')
        .then(spy)
        .catch(err => {
          expect(err.response).to.have.status(404);
        })
        .then(() => {
          expect(spy).to.not.have.been.called();
        });
    });

  });

  describe('POST /v1/items', function () {

    it('should create and return a new item when provided valid data', function () {
      const newItem = {
        'name': 'Zucchini',
        'checked': false
      };
      return chai.request(app)
        .post('/v1/items')
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
      const spy = chai.spy();
      return chai.request(app)
        .post('/v1/items')
        .send(newItem)
        .then(spy)
        .catch((err) => {
          const res = err.response;
          expect(res).to.have.status(400);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body.message).to.equal('Missing `name` in request body');
        })
        .then(() => {
          expect(spy).to.not.have.been.called();
        });
    });

  });

  describe('PUT /v1/items/:id', function () {

    it('should replace entire item', function () {
      const item = {
        'name': 'Raisins'
      };
      return chai.request(app)
        .put('/v1/items/1005')
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
      const spy = chai.spy();
      return chai.request(server)
        .put('/v1/items/9999')
        .send(item)
        .then(spy)
        .catch(err => {
          expect(err.response).to.have.status(404);
        })
        .then(() => {
          expect(spy).to.not.have.been.called();
        });
    });

  });

  describe('PATCH /v1/items/:id', function () {

    it('should update item with requested fields', function () {
      const item = {
        'name': 'Raisins'
      };
      return chai.request(app)
        .patch('/v1/items/1005')
        .send(item)
        .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'name', 'checked');
          expect(res.body.id).to.equal(1005);
          expect(res.body.name).to.equal(item.name);
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      const item = {
        'name': 'Raisins'
      };
      const spy = chai.spy();
      return chai.request(server)
        .patch('/v1/items/9999')
        .send(item)
        .then(spy)
        .catch(err => {
          expect(err.response).to.have.status(404);
        })
        .then(() => {
          expect(spy).to.not.have.been.called();
        });
    });

  });


  describe('DELETE  /v1/items/:id', function () {

    it('should delete an item by id', function () {
      return chai.request(app)
        .delete('/v1/items/1005')
        .then(function (res) {
          expect(res).to.have.status(204);
        });
    });

    it('should respond with a 404 for an invalid id', function () {
      const spy = chai.spy();
      return chai.request(app)
        .delete('/v1/items/9999')
        .then(spy)
        .catch(err => {
          expect(err.response).to.have.status(404);
        })
        .then(() => {
          expect(spy).to.not.have.been.called();
        });
    });

  });

});
