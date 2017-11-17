'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js');


chai.use(chaiHttp);
const should = chai.should();




function deepThought(val){
  if (val === 42) {
    return 'The Answer';
  } else {
    throw Error('Boom');
  }
}




describe('Items API', function () {

  it('true should be true', function () {
    true.should.be.true;
  });

  it('should return a list of item', function () {
    return chai.request(app).get('/api/items')
      .then(results => {
        results.should.have.status(200);
        results.body.should.be.an('array');
        results.body.length.should.be.above(0);
        // results.body.length.to.have.lengthOf.above(2);
        results.body.forEach(function(item){
          item.should.be.an('object');
          item.should.have.all.key('id', 'name');
        });
      });
  });

  it('should return the answer if given 42', function(){
    deepThought(42).should.equal('The Answer');
  });

  it('should throw an error', function(){
    should.throw(function() {
      deepThought(99);
    });
  });
});
