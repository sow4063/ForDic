var request = require('supertest');
var express = require('express');
var expect = require('chai').expect;
var app = require('../server.js');
var mongoose = require('mongoose');

var db = require('../config/db.js');
var Word = require('../app/words/wordModel.js');
var WordController = require('../app/words/wordController.js');

/////////////////////////////////////////////////////
// NOTE: these tests are designed for mongo!
/////////////////////////////////////////////////////

describe('', function() {

	beforeEach(function(done) {
		if( mongoose.connection.db ) {
			console.log('already connected.');
			return done();
		}

    console.log('db connect.');
    mongoose.connect(db.url, done);
  });

  describe('word query: ', function() {

    it('Only valid urls, returning a 404 - Not found for invalid urls', function(done) {
      request(app)
        .post('/links')
        .send({
          'url': 'definitely not a valid url'})
        .expect(404)
        .end(done);
    });

    it('Fetches the word', function(done) {
      var query = {'keyword': '루', 'condition': 'korean'};
      request(app)
        .get('/search')
        .send(query)
        .expect(200)
        .expect(function(res) {
          console.log('res ==> ', res.body.length);
          expect(res.body.length).to.be.greaterThan(1);
        })
        .end(done);
    });

  }); // word query

});