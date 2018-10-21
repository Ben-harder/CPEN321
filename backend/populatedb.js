#! /usr/bin/env node

console.log("This script populates database that connected to port: mongodb://localhost:27017/");

// require models
var async = require('async');
var Job = require('./models/job');
var User = require('./models/user');
var Image = require('./models/image');

// set up the connection
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var mongoDB = "mongodb://127.0.0.1/cpen_321";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
    // create an instance of the user
    var user = new User();
    if (first_name != false) user.first_name = first_name;
    if (last_name != false) user.last_name = last_name;
    if (phone_number != false) user.phone_number = phone_number;
    if (hash_password != false) user.hash_password = hash_password;

    // auto set
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.images = [];
    user.jobs = [];
  
    // save the user
    user.save(function (err) {
        if (err) {
            console.log("error in userCreate");
            return null;
        }
        console.log('New User: ' + user);
        return true;
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
async function jobCreate(job_title, description, wage, address, employer) {
    var job = new Job();
    if (job_title != false) job.job_title = job_title;
    if (description != false) job.description = description;
    if (wage != false) job.wage = wage;
    if (address != false) job.address = address;
    if (employer != false) job.employer = employer;

    // auto set
    job.employee = undefined;
    job.created_at = Date.now;
    job.deleted_at = undefined;
    job.is_deleted = false;
    job.is_compeleted = false;
    job.is_active = false;
    // console.log(job);
    // save the job
    console.log("before");
    try {
        var here =  await job.save();
        // console.log('in try,', here);
    } catch (err) {
        console.log('in err', err);
        return {is_error: true , error: err.message};
    }

}


/**
 * Init a dummy user
 */
function initUser() {
    userCreate("Osama", "Dawood", "6047243630", "YouLikeThat?");
}


/**
 * Init a dummy job
 */
function initJob() {
    User.findOne(async function (err, employer) {
        if (err) {
            
        }
        var retval = await jobCreate("Meat Beat", "I like it like that", "wain", employer.ObjectId);
        console.log('fuck before');
        if (retval.is_error) {
            
        }
        console.log("fuck after");
        return;
      });
}

function getOutOfHere() {
    console.log("Bye Bye!");
    mongoose.connection.close();
}

/**  
 * CAUTION: this function will init your database.
 * 
 * Note: this function is useful for development 
 */
function init() {
    initJob();
    // getOutOfHere();
}

init();

