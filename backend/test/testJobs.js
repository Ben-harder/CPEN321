// const request = require('request');
// const assert = require('assert');
// const baseUrl = "http://localhost:3001";
// const expect = require('chai').expect;

// //include tested files
// const job = require('../api/job/job');

// const getAppliedUserNotApplied = {
//   phoneNumber: 6043347758
// };
// const getAppliedUserApplied = {
//   phoneNumber: 6043388885
// };
// const canApplyAlreadyAppliedUser = {
//   userID: "dummy"
// };
// const canApplyAlreadyAppliedJob = {
//   jobID: "dummy"
// };
// const canApplyIsCreatorUser = {
//   userID: "dummy"
// };
// const canApplyIsCreatorJob = {
//   jobID: "dummy"
// };
// const canApplyCorrectUser = {
//   userID: "dummy"
// };
// const canApplyCorrectJob = {
//   jobID: "dummy"
// };

// /**
//  * Tests for Get Applied-For Jobs.
//  */
// describe("Get Applied-For Jobs", function () {
//   var url = "/job/get-taken-jobs";

//   /** 1)
//    * Test Case: Null user
//    * Input/Output: Pass a NULL request user  parameter.
//    * Pass/Fail Criteria: Only succeeds if it returns error
//    *                     code (400) with the message "User is a required field”.
//    */
//   it("Null user", function (done) {
//     request(baseUrl + url, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("User is a required field");
//       done();
//     });
//   });

//   /**
//    * 2)
//    * Test Case: Applicant has not applied for any jobs
//    * Input/Output: Send a request with a user phone _number
//    *               that has not applied to any job.
//    * Pass/Fail Criteria: Only succeeds if it returns error code
//    *                     (400) with error message User has not applied to any jobs”.
//    */
//   it("Applicant has not applied for any jobs", function (done) {
//     let options = {
//       phoneNumber: getAppliedUserNotApplied.phoneNumber
//     };
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("User has not applied to any jobs");
//       done();
//     });
//   });

//   /**
//    * 3)
//    * Test Case: Successfully create a user, apply for a few
//    *            jobs and send a request to get those jobs.
//    * Input/Output: Send a request with a user phone _number
//    *               that has not applied to any job.
//    * Pass/Fail Criteria: Only succeeds if it returns code (200) with
//    *                     no error message and an array of correct expected jobs.
//    */
//   it("Applicant has applied for any jobs", function (done) {
//     /**shou */
//     let options = {
//       phoneNumber: getAppliedUserApplied.phoneNumber
//     }
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(200);
//       expect(body.errorMessage)
//         .to
//         .equal("User hasn't applied for jobs");
//       done();
//     });
//   });

// });

// /**
//  * Tests for Get All jobs.
//  */
// describe("Get Applied-For Jobs", function () {
//   var url = "/get-all-jobs";

//   /** 1)
//    * Test Case: Success case
//    * Input/Output: Send a request to get all jobs in the database.
//    *               Now, this should return and array that includes
//    *               as many jobs as there is in the database, one test
//    *               case could be successfully adding some jobs, and then
//    *               asserting that the number of returned jobs is at least
//    *               equal to the number of added jobs.
//    * Pass/Fail Criteria: Only succeeds if it returns code (200) and no error
//    *                     message. The returned array should have at least as
//    *                     many jobs as successfully added to the database.
//    */
//   it("Success case", function (done) {
//     request(baseUrl + url, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(200);
//       expect(body[0])
//         .to
//         .not
//         .equal(undefined);
//       done();
//     });
//   });

// });

// /**
//  * Tests for User Is Able To Apply.
//  */
// describe("User Is Able To Apply", function () {
//   var url = "/job/can-apply";

//   /** 1)
//    * Test Case: Null user
//    * Input/Output: Pass a NULL request user  parameter.
//    * Pass/Fail Criteria: Only succeeds if it returns error code (400) with the message
//    *                     “User is a required field”
//    */
//   it("Null user", function (done) {
//     let options = {
//       jobID: 33434
//     };
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("User is a required field");
//       done();
//     });
//   });

//   /** 2)
//    * Test Case: Null job
//    * Input/Output: Pass a NULL request job parameter.
//    * Pass/Fail Criteria: Only succeeds if it returns error code (400) with the message
//    *                     "Job is a required field”
//    */
//   it("Null job", function (done) {
//     let options = {
//       userID: 33434
//     };
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("Job is a required field");
//       done();
//     });
//   });

//   /**
//    * 3)
//    * Test Case: User has already applied to this job.
//    * Input/Output: Send a request with a user phone _number that has
//    *               already applied to this job.
//    * Pass/Fail Criteria: Only succeeds if it returns code (400) with error
//    *                     message "You have already applied to this job"
//    */
//   it("User has already applied to this job", function (done) {
//     let options = {
//       userID: canApplyAlreadyAppliedUser.userID,
//       jobID: canApplyAlreadyAppliedJob.jobID
//     }
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("You have already applied to this job");
//       done();
//     });
//   });

//   /**
//    * 4)
//    * Test Case: User is the creator of this job.
//    * Input/Output: Send a request with a user phone _number that
//    *               is the creator of the same job.
//    * Pass/Fail Criteria: Only succeeds if it returns code (400) with error
//    *                     message "You can't apply to your own job"
//    */
//   it("User is the creator of this job", function (done) {
//     let options = {
//       userID: canApplyIsCreatorUser.userID,
//       jobID: canApplyIsCreatorJob.jobID
//     }
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("You can't apply to your own job");
//       done();
//     });
//   });

//   /**
//    * 5)
//    * Test Case: Correct application form.
//    * Input/Output: Send a request with a correct phone_number that
//    *               is neither an employer nor a previous applicant of this job.
//    * Pass/Fail Criteria: Only succeeds if it returns code (200) with
//    *                     no error messages.
//    */
//   it("Correct application form", function (done) {
//     let options = {
//       userID: canApplyCorrectUser.userID,
//       jobID: canApplyCorrectJob.jobID
//     }
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(200);
//       done();
//     });
//   });

// });

// /**
//  * Tests for User Is Able To Apply.
//  */
// describe("Create Job", function () {
//   var url = "/create-job";

//   /**
//   * 1)
//   * Test Case: Null job.
//   * Input/Output: Pass a NULL request parameter.
//   * Pass/Fail Criteria: Only succeeds if it returns error code
//   *                     (400) with the message “All fields have not been filled out”.
//   */
//   it("Pass a NULL request parameter", function (done) {
//     request(baseUrl + url, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("All fields have not been filled out");
//       done();
//     });
//   });

//   /**
//   * 2)
//   * Test Case: No job_title.
//   * Input/Output: Pass a NULL job title parameter.
//   * Pass/Fail Criteria: Only succeeds if it returns error code
//   *                     (400) with the message “All fields have not been filled out”.
//   */
//   it("No job_title", function (done) {
//     let options = {};
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("All fields have not been filled out");
//       done();
//     });
//   });

//   /**
//  * 3)
//  * Test Case: No job_description.
//  * Input/Output: Pass a NULL job_description.
//  * Pass/Fail Criteria: Only succeeds if it returns error code
//  *                     (400) with the message “All fields have not been filled out”.
//  */
//   it("No job_description", function (done) {
//     let options = {
//       job_title: "dummy"
//     };
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("All fields have not been filled out");
//       done();
//     });
//   });

//   /**
//  * 4)
//  * Test Case: No wage.
//  * Input/Output: Pass a NULL wage.
//  * Pass/Fail Criteria: Only succeeds if it returns error code
//  *                     (400) with the message “All fields have not been filled out”.
//  */
//   it("No wage", function (done) {
//     let options = {
//       job_title: "dummy",
//       job_description: "dummy"
//     };
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("All fields have not been filled out");
//       done();
//     });
//   });

//   /**
//  * 5)
//  * Test Case: No address.
//  * Input/Output: Pass a no address.
//  * Pass/Fail Criteria: Only succeeds if it returns error code
//  *                     (400) with the message “All fields have not been filled out”.
//  */
//   it("No address", function (done) {
//     let options = {
//       job_title: "dummy",
//       job_description: "dummy",
//       wage: 10
//     };
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("All fields have not been filled out");
//       done();
//     });
//   });

//   /**
//  * 6)
//  * Test Case: No employer ID.
//  * Input/Output: Pass a no employer ID.
//  * Pass/Fail Criteria: Only succeeds if it returns error code
//  *                     (400) with the message “All fields have not been filled out”.
//  */
//   it("No employer ID", function (done) {
//     let options = {
//       job_title: "dummy",
//       job_description: "dummy",
//       wage: 10,
//       address: "9832 wain street"
//     };
//     request(baseUrl + url, options, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("All fields have not been filled out");
//       done();
//     });
//   });

//   /**
//  * 7)
//  * Test Case: Zero wage.
//  * Input/Output: Pass a zero  wage.
//  * Pass/Fail Criteria: Only succeeds if it returns error code
//  *                     (400) with the message "Employees won't work for free!”.
//  */
//   it("Zero wage", function (done) {
//     let options = {
//       job_title: "dummy",
//       job_description: "dummy",
//       wage: 0,
//       address: "dummy",
//       employerID: "dummy"
//     };
//     request(baseUrl + url, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("Employees won't work for free!");
//       done();
//     });
//   });

//   /**
//  * 8)
//  * Test Case: Negative wage.
//  * Input/Output: Pass a negative  wage.
//  * Pass/Fail Criteria: Only succeeds if it returns error code
//  *                     (400) with the message "Woah! employees won't work AND pay you money!”.
//  */
//   it("Negative wage", function (done) {
//     let options = {
//       job_title: "dummy",
//       job_description: "dummy"
//     }
//     request(baseUrl + url, function (err, res, body) {
//       expect(res.statusCode)
//         .to
//         .equal(400);
//       expect(body.errorMessage)
//         .to
//         .equal("Woah! employees won't work AND pay you money!");
//       done();
//     });
//   });

// });