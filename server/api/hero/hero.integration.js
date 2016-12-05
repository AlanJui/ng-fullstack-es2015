'use strict';

var app = require('../..');
import request from 'supertest';

var newHero;

describe('Hero API:', function() {
  describe('GET /api/heroes', function() {
    var heros;

    beforeEach(function(done) {
      request(app)
        .get('/api/heroes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          heros = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      heros.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/heroes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/heroes')
        .send({
          name: 'New Hero',
          info: 'This is the brand new hero!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newHero = res.body;
          done();
        });
    });

    it('should respond with the newly created hero', function() {
      newHero.name.should.equal('New Hero');
      newHero.info.should.equal('This is the brand new hero!!!');
    });
  });

  describe('GET /api/heroes/:id', function() {
    var hero;

    beforeEach(function(done) {
      request(app)
        .get(`/api/heroes/${newHero._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          hero = res.body;
          done();
        });
    });

    afterEach(function() {
      hero = {};
    });

    it('should respond with the requested hero', function() {
      hero.name.should.equal('New Hero');
      hero.info.should.equal('This is the brand new hero!!!');
    });
  });

  describe('PUT /api/heroes/:id', function() {
    var updatedHero;

    beforeEach(function(done) {
      request(app)
        .put(`/api/heroes/${newHero._id}`)
        .send({
          name: 'Updated Hero',
          info: 'This is the updated hero!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedHero = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedHero = {};
    });

    it('should respond with the original hero', function() {
      updatedHero.name.should.equal('New Hero');
      updatedHero.info.should.equal('This is the brand new hero!!!');
    });

    it('should respond with the updated hero on a subsequent GET', function(done) {
      request(app)
        .get(`/api/heroes/${newHero._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let hero = res.body;

          hero.name.should.equal('Updated Hero');
          hero.info.should.equal('This is the updated hero!!!');

          done();
        });
    });
  });

  describe('PATCH /api/heroes/:id', function() {
    var patchedHero;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/heroes/${newHero._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Hero' },
          { op: 'replace', path: '/info', value: 'This is the patched hero!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedHero = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedHero = {};
    });

    it('should respond with the patched hero', function() {
      patchedHero.name.should.equal('Patched Hero');
      patchedHero.info.should.equal('This is the patched hero!!!');
    });
  });

  describe('DELETE /api/heroes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/heroes/${newHero._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when hero does not exist', function(done) {
      request(app)
        .delete(`/api/heroes/${newHero._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
