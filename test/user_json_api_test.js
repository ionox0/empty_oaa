'use strict';
//jshint unused:false

var superagent = require('superagent');
var chai = require('chai'),
  expect = chai.expect,
  should = chai.should();
var app = require('../app').app;

describe('Users JSON api', function(){
  var id;

  it('should get a collection', function(done){
    superagent.get('http://localhost:3000/api/v1/users').end(function(er, res){
      expect(er).to.be.equal(null);
      done();
    });
  });

  it('should be able to create a user', function(done){
    superagent.post('http://localhost:3000/api/v1/users')
      .send({first_name: 'Ford', last_name: 'Prefect'})
      .end(function(err, res){
        expect(err).to.be.eql(null);

        expect(res.body.first_name).to.be.eql('Ford');

        id = res.body._id;
        done();
      });
  });

  it('should be able to get users collection', function(done){
    superagent.get('http://localhost:3000/api/v1/users')
      .end(function(e, res){
        expect(e).to.equal(null);
        expect(res.body.length).to.be.above(0);

        done();
      });
  });

  it('should be able to get a single user', function(done){
    superagent.get('http://localhost:3000/api/v1/users/' + id)
      .end(function(e,res){
        expect(e).to.equal(null);
        expect(res.body.first_name).to.be.equal('Ford');

        done();
      });
  });

  it('should be able to update a user', function(done){
    superagent.put('http://localhost:3000/api/v1/users/' + id)
      .send({first_name: 'Arthur', last_name: 'Dent'})
      .end(function(e, res){
        expect(e).to.be.equal(null);

        done();
      });
  });

  it('should be able to delete a user', function(done){
    superagent.del('http://localhost:3000/api/v1/users/' + id)
      .end(function(e, res){
        expect(e).to.be.equal(null);
        expect(res.body.msg).to.be.equal('success');

        done();
      });
  });

});



