var expect = require("chai").expect;
// required to test HTTP requests
var request = require("request");
const job = require('../api/auth/auth');

const baseUrl = "http://localhost:3001";

// constants for users per tested function
/* doesUserExist */
const doesExistExisting = {phoneNumber: 6043796757};
const doesExistNonExisting = {phoneNumber: 6047281754};
/* userSignIn */
const signInCorrect = {phoneNumber: 6043796757, password: "AAA"};
const signInNonExisting = {phoneNumber: 6047281754};

/**
 * Tests for doesUserExist().
 */
describe("Testing: doesUserExist", function() {
  var url = "/auth/user-exists";
  /**
   * 1)
   * Test Case: Null User
   * Input/Output: Pass a NULL request parameter.
   * Pass/Fail Criteria: Only succeeds if it returns error code (400) with 
   *                     the message “Can’t handle undefined objects” 
   */
  it ("Null User", function(done) {
    let options = null;
    request(baseUrl + url, options, function(error, response, body) {
      expect(response.statusCode).to.equal(400);
      expect(body.errorMessage).to.equal("Can’t handle undefined objects");
      // expect(body.exists).to.equal(undefined);
      done();
    });
  });

  /**
   * 2)
   * Test Case: Existing User
   * Input/Output: Send a request with a user phone _number that does exist.
   * Pass/Fail Criteria: Only succeeds if it returns code (200) with no 
   *                     error message and response parameter (exists = true).
   */
  it ("Existing User", function(done) {
    let options = doesExistExisting;
    request(baseUrl + url, options, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body.errorMessage).to.equal(undefined);
      expect(body.exists).to.equal(true);
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
    let options = doesExistNonExisting;
    request(baseUrl + url, options, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body.errorMessage).to.equal(undefined);
      expect(body.exists).to.equal(false);
      done();
    });
  });
});


/**
 * Tests for userSignIn().
 */
describe("Testing: userSignIn", function() {
  var url = "/auth/sign-in";
  /**
   * 1)
   * Test Case: Null user
   * Input/Output: Pass a NULL request parameter. 
   * Pass/Fail Criteria: Only succeeds if it returns error code (400) with the 
   *                     message “Can’t handle undefined objects”.
   */
  it("Null User", function(done) {
    let options = null;
    request(baseUrl + url, options, function(error, response, body) {
      expect(response.statusCode).to.equal(400);
      expect(body.errorMessage).to.equal("Can't handle undefined objects");
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
  it("Non-Existing Phone Number", function(done) {
    let options = signInNonExisting;
    request(baseUrl + url, options, function(error, response, body) {
      expect(response.statusCode).to.equal(400);
      expect(body.errorMessage).to.equal("No user exists with this phone number");
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
  it("Incorrect Password", function(done) {
    let options = signInNonExisting;
    request(baseUrl + url, options, function(error, response, body) {
      expect(response.statusCode).to.equal(400);
      expect(body.errorMessage).to.equal("Incorrect password");
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
  it("Correct Sign In Info", function(done) {
    let options = signInCorrect;
    request(baseUrl + url, options, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      expect(body.errorMessage).to.equal(undefined);
      done();
    });
  });
});