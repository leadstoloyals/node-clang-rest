var should = require('should');
var _      = require('lodash');
var async  = require('async');

var config = require('../../config');
var lib    = require('../../lib');
var llips  = require('llips')(config, lib);
var base   = require('../lib/base');

var supertest = require('supertest');
var requestClang   = supertest(base.clangUrl);


module.exports = function() {
  it('Getting customers should work', function(done) {
    this.timeout(10*1000); //10 seconde, ivm trage responstijd Clang
    requestClang
      .get('/emails/30245')
      .set('uuid', '2e4c06eb-e377-48a5-a25f-4fe2eb285b8b')
      .expect('Content-Type', /json/)
      .expect(function(res) {
        console.log(res.text);
        res.body.data.should.be.an.Array.with.lengthOf(1);
        res.body.data[0].should.have.property('htmlContent');
        res.body.data[0].should.have.property('htmlBlocks');
        res.body.data[0].should.have.property('name').an.be.not.empty;
      })
      .expect(500, done);
  }); //it
};