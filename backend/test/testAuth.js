process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const ObjectId = require('mongodb').ObjectID;
const User = require('../models/user');
const Job = require('../models/job');
const Image = require('../models/image');
const JobPref = require('../models/jobPref');

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
  beforeEach((done) => {
    Image.deleteMany({}, (err) => {
      done();
    });
  });
  
  /**
   * 1)
   * Test Case: Null User
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (400) with 
   *                     the message “All fields have not been filled out” 
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
  beforeEach((done) => {
    Image.deleteMany({}, (err) => {
      done();
    });
  });
  
  /**
   * 1)
   * Test Case: Null User
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "User is a required field"
   */
  it("Test Case: Null job", (done) => {
    chai.request(server).get(url).end((err, res) => {
      res.should.have.status(500);
      res.body.should.have.property('errorMessage').eql("User is a required field");
      done();
    });
  });

  /**
   * 2)
   * Test Case: Existing User
   * Input/Output: Send a request with a user phone _number that does exist.
   * Pass/Fail Criteria: Only succeeds if it returns code (400) with 
   *                     error message "This phone number already has an account!"
   */
  it("Test Case: Existing User", (done) => {    

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
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });
    chai.request(server).get(url).query({phoneNumber: user.phone_number.toString()}).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql("This phone number already has an account!");
      done();
    });
  });

  /**
   * 3) 
   * Test Case: Non-Existing User
   * Input/Output: Send a request with a user phone _number that does not exist.
   * Pass/Fail Criteria: Only succeeds if it returns code (200) with no error 
   *                     message and response parameter (exists = false).
   */
  it ("Non-Existing User", function(done) {
    chai.request(server).get(url).query({phoneNumber: "dummy"}).end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      done();
    });
  });
});


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
  beforeEach((done) => {
    Image.deleteMany({}, (err) => {
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

  /**
   * 2)
   * Test Case: Non_existing phone-number
   * Input/Output: Send a request with a user phone number that does exist.
   * Pass/Fail Criteria: Only succeeds if it returns error code (400) with error 
   *                     message “No user exists with this phone number”.
   */
  it("Test Case: Non_existing phone-number", (done) => {
    chai.request(server).get(url).query({phoneNumber: "dummy", password:  "0xdeadbeef"}).end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql('Login info is invalid!');
      done();
    });
  });

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
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
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
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
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

/**
 * Tests for Update User Preference.
 */
describe("Update User Preference", function () {
  var url = "/user/update-job-preference";
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
  beforeEach((done) => {
    Image.deleteMany({}, (err) => {
      done();
    });
  });
  beforeEach((done) => {
    JobPref.deleteMany({}, (err) => {
      done();
    });
  });
  
  /**
   * 1)
   * Test Case: Null UserPref
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (200) with 
   *                     no error message
   */
  it("Test Case: Null UserPref", (done) => {
    chai.request(server).post(url).end((err, res) => {
      res.should.have.status(500);
      res.body.should.not.have.property('Job preference is a required field');
      done();
    });
  });

  /** 2)
   * Test Case: Type already exists.
   * Input/Output: Return array of job types.
   * Pass/Fail Criteria: Only succeeds if it returns
   *                     code (200) with no error messages
   */
  it('Test Case: Type already exists', (done) => {
    // create a new jobPref
    var dUser = new JobPref();
    var jobPref = new JobPref();
    jobPref.user = dUser._id;
    jobPref.stats = [];
    jobPref.stats.push({job_type: "Feed My Lizard", num_of_occurrences: 5})
    
    // save the jobPref
    jobPref.save((err) => {
      return;
    });
    chai.request(server)
    .post(url)
    .send({jobPrefID: jobPref._id.toString(), jobType: "Feed My Lizard"})
    .end((err, res) => {
      res.should.have.status(200);
      JobPref.findOne({}, (err, jobPref) => {
        jobPref.stats[0].num_of_occurrences.should.be.eql(6);
      });
      done();
    });
  });
});

/**
 * Tests for Update User Info.
 */
describe("Update User Info", function () {
  var url = "/user/change-info";
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
  beforeEach((done) => {
    Image.deleteMany({}, (err) => {
      done();
    });
  });
  beforeEach((done) => {
    JobPref.deleteMany({}, (err) => {
      done();
    });
  });
  
  /**
   * 1)
   * Test Case: Null UserID
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Null userID", (done) => {
    chai.request(server)
    .post(url)
    .send({phoneNumber: "dummy", firstName: "dummy", lastName: "dummy"})
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql("All fields have to be filled out");
      done();
    });
  });
  
  /**
   * 2)
   * Test Case: Null PhoneNumber
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Null phone number", (done) => {
    chai.request(server)
    .post(url)
    .send({userID: "dummy", firstName: "dummy", lastName: "dummy"})
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql("All fields have to be filled out");
      done();
    });
  });
  
  /**
   * 3)
   * Test Case: Null FirstName
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Null first name", (done) => {
    chai.request(server)
    .post(url)
    .send({phoneNumber: "dummy", userID: "dummy", lastName: "dummy"})
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql("All fields have to be filled out");
      done();
    });
  });
  
  /**
   * 4)
   * Test Case: Null LastName
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Null last name", (done) => {
    chai.request(server)
    .post(url)
    .send({phoneNumber: "dummy", firstName: "dummy", userID: "dummy"})
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql("All fields have to be filled out");
      done();
    });
  });
  
  /**
   * 5)
   * Test Case: Succes case 
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Succes case", (done) => {

    // create a new user
    var user = new User();
    user.first_name = "old";
    user.last_name = "old";
    user.phone_number = "old";
    user.hash_password = "dummy";
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });

    chai.request(server)
    .post(url)
    .send({phoneNumber: "new", firstName: "new", userID: user._id.toString(), lastName: "new"})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      res.body.phone_number.should.be.eql('new');
      res.body.first_name.should.be.eql('new');
      res.body.last_name.should.be.eql('new');
      done();
    });
  });
});

/**
 * Update User Password.
 */
describe("Update User Password", function () {
  var url = "/user/update-password";
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
  beforeEach((done) => {
    Image.deleteMany({}, (err) => {
      done();
    });
  });
  beforeEach((done) => {
    JobPref.deleteMany({}, (err) => {
      done();
    });
  });
  
  /**
   * 1)
   * Test Case: Null UserID
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Null userID", (done) => {
    chai.request(server)
    .post(url)
    .send({password: "dummy", passwordConfirm: "dummy"})
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql("All fields have to be filled out");
      done();
    });
  });
  
  /**
   * 2)
   * Test Case: Null Password
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Null password", (done) => {
    chai.request(server)
    .post(url)
    .send({passwordConfirm: "dummy", userID: "dummy",})
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql("All fields have to be filled out");
      done();
    });
  });
  
  /**
   * 3)
   * Test Case: Null Password Confirm
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Null confirm password", (done) => {
    chai.request(server)
    .post(url)
    .send({password: "dummy", userID: "dummy"})
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql("All fields have to be filled out");
      done();
    });
  });
  
  /**
   * 4)
   * Test Case: Passwords don't match 
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Passwords don't match", (done) => {

    // create a new user
    var user = new User();
    user.first_name = "dummy";
    user.last_name = "dummy";
    user.phone_number = "dummy";
    user.hash_password = "old";
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });

    chai.request(server)
    .post(url)
    .send({password: "new", passwordConfirm: "diff", userID: user._id.toString()})
    .end((err, res) => {
      res.should.have.status(400);
      res.body.should.have.property('errorMessage').eql("Passwords do not match");
      done();
    });
  });
  
  /**
   * 5)
   * Test Case: Succes case 
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Succes case", (done) => {

    // create a new user
    var user = new User();
    user.first_name = "dummy";
    user.last_name = "dummy";
    user.phone_number = "dummy";
    user.hash_password = "old";
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });

    chai.request(server)
    .post(url)
    .send({password: "new", passwordConfirm: "new", userID: user._id.toString()})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      res.body.hash_password.should.be.eql('new');
      done();
    });
  });
});

/**
 * Rate User.
 */
describe("Rate User", function () {
  var url = "/user/rate-user";
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
  beforeEach((done) => {
    Image.deleteMany({}, (err) => {
      done();
    });
  });
  beforeEach((done) => {
    JobPref.deleteMany({}, (err) => {
      done();
    });
  });
  
  /**
   * 1)
   * Test Case: Null UserID
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Null userID", (done) => {
    chai.request(server)
    .post(url)
    .send({rating: "dummy"})
    .end((err, res) => {
      res.should.have.status(500);
      res.body.should.have.property('errorMessage').eql("All fields have to be filled out");
      done();
    });
  });
  
  /**
   * 2)
   * Test Case: Null rating
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Null userID", (done) => {
    chai.request(server)
    .post(url)
    .send({rating: true})
    .end((err, res) => {
      res.should.have.status(500);
      res.body.should.have.property('errorMessage').eql("All fields have to be filled out");
      done();
    });
  });
  
  /**
   * 3)
   * Test Case: Non boolean rating
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Non boolean rating", (done) => {
    chai.request(server)
    .post(url)
    .send({rating: 0, userID: "3232"})
    .end((err, res) => {
      res.should.have.status(500);
      res.body.should.have.property('errorMessage').eql("Rating has to be boolean");
      done();
    });
  });
  
  /**
   * 3)
   * Test Case: Up vote success case.
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Up vote success case", (done) => {

    // create a new user
    var user = new User();
    user.first_name = "dummy";
    user.last_name = "dummy";
    user.phone_number = "dummy";
    user.hash_password = "old";
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });

    chai.request(server)
    .post(url)
    .send({rating: true, userID: user._id.toString()})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      res.body.should.have.property('up_votes');
      res.body.up_votes.should.be.eql(1);
      res.body.should.have.property('down_votes');
      res.body.down_votes.should.be.eql(0);
      done();
    });
  });
  
  /**
   * 4)
   * Test Case: Down vote success case.
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "All fields have to be filled out"
   */
  it("Test Case: Up vote success case", (done) => {

    // create a new user
    var user = new User();
    user.first_name = "dummy";
    user.last_name = "dummy";
    user.phone_number = "dummy";
    user.hash_password = "old";
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });

    chai.request(server)
    .post(url)
    .send({rating: false, userID: user._id.toString()})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      res.body.should.have.property('up_votes');
      res.body.up_votes.should.be.eql(0);
      res.body.should.have.property('down_votes');
      res.body.down_votes.should.be.eql(1);
      done();
    });
  });
});

/**
 * Get User Profile.
 */
describe("Get User Profile", function () {
  var url = "/user/get-user-profile";
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
  beforeEach((done) => {
    Image.deleteMany({}, (err) => {
      done();
    });
  });
  beforeEach((done) => {
    JobPref.deleteMany({}, (err) => {
      done();
    });
  });
  
  /**
   * 1)
   * Test Case: Null UserID
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "User is a required field"
   */
  it("Test Case: Null userID", (done) => {
    chai.request(server)
    .get(url)
    .end((err, res) => {
      res.should.have.status(500);
      res.body.should.have.property('errorMessage').eql("User is a required field");
      done();
    });
  });
  
  /**
   * 2)
   * Test Case: Success zero case.
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "User does not exist"
   */
  it("Test Case: Success zero case", (done) => {

    // create a new user
    var user = new User();
    var profilePicture = new Image();
    profilePicture.user = user._id;
    profilePicture.image_src = "dummy";
    user.first_name = "dummy";
    user.last_name = "dummy";
    user.phone_number = "dummy";
    user.hash_password = "old";
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
    user.profile_picture = profilePicture._id;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });
    // save the user
    profilePicture.save((err) => {
      return;
    });
    chai.request(server)
    .get(url)
    .query({userID: user._id.toString()})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      res.body.should.be.a('object');
      res.body.should.have.property('upVotes').eql(user.up_votes);
      res.body.should.have.property('downVotes').eql(user.down_votes);
      res.body.should.have.property('numOfPostedJobs').eql(user.posted_jobs);
      res.body.should.have.property('numOfTakenJobs').eql(user.taken_jobs);
      res.body.should.have.property('profilePicture').eql(profilePicture.image_src);
      done();
    });
  });
  
  /**
   * 2)
   * Test Case: Success non zero case.
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (500) with 
   *                     error message "User does not exist"
   */
  it("Test Case: Success non zero case", (done) => {

    // create a new user
    var user = new User();
    var profilePicture = new Image();
    profilePicture.user = user._id;
    profilePicture.image_src = "dummy";
    user.first_name = "dummy";
    user.last_name = "dummy";
    user.phone_number = "dummy";
    user.hash_password = "old";
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.up_votes = 4;
    user.down_votes = 5;
    user.posted_jobs = 6;
    user.taken_jobs = 2;
    user.profile_picture = profilePicture._id;
    user.images = [];

    // save the user
    user.save((err) => {
      return;
    });
    // save the user
    profilePicture.save((err) => {
      return;
    });
    chai.request(server)
    .get(url)
    .query({userID: user._id.toString()})
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.not.have.property('errorMessage');
      res.body.should.be.a('object');
      res.body.should.have.property('upVotes').eql(user.up_votes);
      res.body.should.have.property('downVotes').eql(user.down_votes);
      res.body.should.have.property('numOfPostedJobs').eql(user.posted_jobs);
      res.body.should.have.property('numOfTakenJobs').eql(user.taken_jobs);
      res.body.should.have.property('profilePicture').eql(profilePicture.image_src);
      done();
    });
  });
});