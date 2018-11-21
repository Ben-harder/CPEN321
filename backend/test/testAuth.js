// var expect = require("chai").expect;
// // required to test HTTP requests
// var request = require("request");
// const job = require('../api/auth/auth');

// const baseUrl = "http://localhost:3001";

// // constants for users per tested function
// /* doesUserExist */
// const doesExistExisting = {phoneNumber: 6043796757};
// const doesExistNonExisting = {phoneNumber: 6047281754};
// /* userSignIn */
// const signInCorrect = {phoneNumber: 6043796757, password: "AAA"};
// const signInNonExisting = {phoneNumber: 6047281754};



process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;
const User = require('../models/user');
const Job = require('../models/job');

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();
const expect = chai.expect();

chai.use(chaiHttp);

/**
 * Tests for createUser().
 */
describe("Testing: createUser", function() {
  var url = "/auth/create-user";
  beforeEach((done) => {
    Job.deleteMany({}, (err) => {
      done();
    });
  });
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  
  /**
   * 1)
   * Test Case: Null User
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (400) with 
   *                     the message “Can’t handle undefined objects” 
   */
  it("Test Case: Null user", (done) => {
    chai.request(server).post(url).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql('All fields have not been filled out');
      done();
    });
  });
  
  
  /**
   * 2)
   * Test Case: Success Case
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (200) with 
   *                     no error message
   */
  it("Test Case: Success Case", (done) => {
    let user = {};
    user.phoneNumber = "60443432221";
    user.password = "hahaha";
    user.passwordConfirm = "hahaha";
    user.firstName = "dummy";
    user.lastName = "dummy";
    chai.request(server).post(url).send(user).end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      done();
    });
  });
  
  /**
  * 3)
  * Test Case: Passwords Don't Match
  * Input/Output: Pass a NULL request parameter.
  * Pass/Fail Criteria: Only succeeds if it returns error code (200) with 
  *                     no error message
  */
 it("Test Case: Passwords Don't Match", (done) => {
   let user = {};
   user.phoneNumber = "60443432221";
   user.password = "hahaha";
   user.passwordConfirm = "pffff";
   user.firstName = "dummy";
   user.lastName = "dummy";
   chai.request(server).post(url).send(user).end((err, res) => {
     res.should.have.status(400);
     res.body.should.have.property('errorMessage').eql('Passwords do not match');
     done();
   });
 });

});

/**
 * Tests for doesUserExist().
 */
describe("Testing: doesUserExist", function() {
  var url = "/auth/user-exists";
  beforeEach((done) => {
    Job.deleteMany({}, (err) => {
      done();
    });
  });
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  
  /**
   * 1)
   * Test Case: Null User
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (200) with 
   *                     no error message
   */
  it("Test Case: Null job", (done) => {
    chai.request(server).get(url).end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      done();
    });
  });

});

//   /**
//    * 2)
//    * Test Case: Existing User
//    * Input/Output: Send a request with a user phone _number that does exist.
//    * Pass/Fail Criteria: Only succeeds if it returns code (200) with no 
//    *                     error message and response parameter (exists = true).
//    */
//   it ("Existing User", function(done) {
//     let options = doesExistExisting;
//     request(baseUrl + url, options, function(error, response, body) {
//       expect(response.statusCode).to.equal(200);
//       expect(body.errorMessage).to.equal(undefined);
//       expect(body.exists).to.equal(true);
//       done();
//     });
//   });

//   /**
//    * 3) 
//    * Test Case: Non-Existing User
//    * Input/Output: Send a request with a user phone _number that does not exist.
//    * Pass/Fail Criteria: Only succeeds if it returns code (200) with no error 
//    *                     message and response parameter (exists = false).
//    */
//   it ("Non-Existing User", function(done) {
//     let options = doesExistNonExisting;
//     request(baseUrl + url, options, function(error, response, body) {
//       expect(response.statusCode).to.equal(200);
//       expect(body.errorMessage).to.equal(undefined);
//       expect(body.exists).to.equal(false);
//       done();
//     });
//   });
// });


/**
 * Tests for userSignIn().
 */
describe("Testing: userSignIn", function() {
  var url = "/auth/user-exists";
  beforeEach((done) => {
    Job.deleteMany({}, (err) => {
      done();
    });
  });
  beforeEach((done) => {
    User.deleteMany({}, (err) => {
      done();
    });
  });
  var url = "/auth/sign-in";
  /**
   * 1)
   * Test Case: Null user
   * Input/Output: Pass a NULL request parameter. 
   * Pass/Fail Criteria: Only succeeds if it returns error code (400) with the 
   *                     message “Can’t handle undefined objects”.
   */
  it("Test Case: Null user", (done) => {
    chai.request(server).get(url).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql('All fields have not been filled out');
      done();
    });
  });

//   /**
//    * 2)
//    * Test Case: Non_existing phone-number
//    * Input/Output: Send a request with a user phone number that does exist.
//    * Pass/Fail Criteria: Only succeeds if it returns error code (400) with error 
//    *                     message “No user exists with this phone number”.
//    */
//   it("Non-Existing Phone Number", function(done) {
//     let options = signInNonExisting;
//     request(baseUrl + url, options, function(error, response, body) {
//       expect(response.statusCode).to.equal(400);
//       expect(body.errorMessage).to.equal("No user exists with this phone number");
//       done();
//     });
//   });

  /**
   * 3)
   * Test Case: Incorrect password
   * Input/Output: Send a request with a user phone _number that does not exist.
   * Pass/Fail Criteria: Only succeeds if it returns error code (400) with 
   *                     error message “Incorrect password”.
   */
  it("Test Case: Incorrect password", (done) => {

    // create a new user
    var user = new User();
    user.first_name = "dummy";
    user.last_name = "dummy";
    user.phone_number = "hasapplied";
    user.hash_password = "dummy";
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });

    chai.request(server).get(url).query({phoneNumber: user.phone_number.toString(), password:  "0xdeadbeef"}).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql('Login info is invalid!');
      done();
    });
  }); 

  /**
   * 4)
   * Test Case: Correct sign in info
   * Input/Output: Send a request with a correct phone_number and password.
   * Pass/Fail Criteria: Only succeeds if it returns code (200) with no 
   *                     error messages.
   */
  it("Test Case: Correct sign in info", (done) => {

    // create a new user
    var user = new User();
    user.first_name = "dummy";
    user.last_name = "dummy";
    user.phone_number = "whatever";
    user.hash_password = "dummy";
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });

    chai.request(server).get(url).query({phoneNumber: user.phone_number.toString(), password: user.hash_password.toString()}).end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      res.body.should.be.a('object');
      done();
    });
  });
});