// const request = require('request');
// const assert = require('assert');
// const baseUrl = "http://localhost:3001";
// const expect = require('chai').expect;

// describe('Demo Tests', function(){

//   // demo test 1  
//   it('Demo test 1: (1 == 1)', function() {
//     expect(1).to.equal(1);
//   });

// });

process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const Job = require('../models/job');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

// remove all jobs
describe('Jobs', () => {
  beforeEach((done) => {
    Job.remove({}, (err) => {
      done();
    });
  });

  describe('get all jobs', () => {
    it('it should get all jobs', (done) => {
      chai.request(server).get('/get-all-jobs').end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
  });
});
