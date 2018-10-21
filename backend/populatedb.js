#! /usr/bin/env node

console.log("This script populates database that connected to port: mongodb://localhost:27017/");

// require models
var async = require('async');
var Job = require('./models/job')
var User = require('./models/user')
var Image = require('./models/image')

// set up the connection
var mongoose = require('mongoose');
var mongoDB = "mongodb://localhost:27017/";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var users = [];
var jobs = [];
var images = [];


/**  
 * Create a new job. When a user created:
 *  - verification_token = undefined
 *  - working_job_id = undefined
 *  - is_working = false
 *  - is_verified = false
 *  - is_employer = false
 *  - images = []
 *  - jobs = []
 * 
 *  Note: all fields are required for a user to be created.
 * 
 *  INVATIANTS:
 *      - All parameters are valid and precise.
 */
function userCreate(first_name, last_name, phone_number, hash_password) {
    var userDetails;
    if (first_name != false) userDetails.full_name.first = first_name;
    if (last_name != false) userDetails.full_name.last = last_name;
    if (phone_number != false) userDetails.phone_number = phone_number;
    if (hash_password != false) userDetails.hash_password = hash_password;

    // auto set
    userDetails.verification_token = undefined;
    userDetails.working_job_id = undefined;
    userDetails.is_working = false;
    userDetails.is_verified = false;
    userDetails.is_employer = false;
    userDetails.images = [];
    userDetails.jobs = [];
  
    // create an instance of the user
    var user = new User(userDetails);
        
    // save the user
    user.save(function (err) {
        if (err) {
            return;
        }
        console.log('New User: ' + user);
        user.push(user);
    });
}


/**  
 * Create a new job. When a job created:
 *  - created_at = current time
 *  - employee = undefined
 *  - deleted_at = undefined
 *  - is_deleted = false
 *  - is_completed = false
 *  - is_active = false
 * 
 *  Note: all fields are required for a job to be created.
 * 
 *  INVATIANTS:
 *      - Employer does exist in the database and employer.is_employer = true.
 *      - All parameters are valid and precise.
 */
function jobCreate(job_title, description, wage, address, employer) {
    var jobDetails;
    if (job_title != false) jobDetails.job_title = job_title;
    if (description != false) jobDetails.description = description;
    if (wage != false) jobDetails.wage = wage;
    if (address != false) jobDetails.address = address;
    if (employer != false) jobDetails.employer = employer;

    // auto set
    jobDetails.employee = undefined;
    jobDetails.created_at = Date.now;
    jobDetails.deleted_at = undefined;
    jobDetails.is_deleted = false;
    jobDetails.is_compeleted = false;
    jobDetails.is_active = false;
  
    // create an instance of the job
    var job = new Job(jobDetails);
        
    // save the job
    job.save(function (err) {
        if (err) {
            return;
        }
        console.log('New Job: ' + job);
        job.push(job);
    });
}


/**
 * Init a dummy user
 */
function initUser() {
    userCreate();
}


/**
 * Init a dummy job
 */
function initJob() {
    jobCreate();
}

/**  
 * CAUTION: this function will init your database.
 * 
 * Note: this function is useful for development 
 */
async.series([
    initUser,
    initJob
]);



