'use strict';

const Promise    = require('bluebird');
const assert     = require('assert');
const expect     = require('chai').expect;
const supertestp = require('supertest-as-promised');

const api = supertestp('http://localhost:8000/api');
const app = require('./sample-app/server');

const LoopbackDisableAllRemoteMethodsMixin = require('../lib/loopback-disable-all-remote-methods-mixin');

describe('#loopback-disable-all-remote-methods-mixin', () => {

  before((done) => {
    // Listen on HTTP requests
    app.listen(8000, () => {
      Promise.all([
        app.models.Person.create({name: 'Alexander'}),
        app.models.Person.create({name: 'Aurelis'}),
      ])
      .then(() => {
        done();
      })
    });
  });

  it('existing method', (done) => {
    api.get('/People')
    .expect(200)
    .then((result) => {
      done();
    });
  });

  it('not existing method', (done) => {
    api.get('/People/1')
    .expect(200)
    .then((result) => {
      done();
    });
  });

  it('not existing method', (done) => {
    api.get('/People/count')
    .expect(404)
    .then((result) => {
      console.log(result.body)
      expect(result.body.error.name).to.equal('Error')
      expect(result.body.error.statusCode).to.equal(404)
      done();
    });
  });

  it('complete uncover code', () => {
    const Model = {
      settings: {},
      sharedClass: {
        name: "sharedClass",
        methods: () => { return [] },
      },
      disableRemoteMethodByName: () => true,
    };
    LoopbackDisableAllRemoteMethodsMixin(Model, { active: true});

  });

  after(() => {
    process.exit();
  });

});
