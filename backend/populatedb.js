#! /usr/bin/env node
var database = require("./initdb");

console.log("This script populates database that connected to port: mongodb://localhost:27017/");

// require models
var Job = require("./models/job");
var User = require("./models/user");
var Image = require("./models/image");

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("close", () => console.log("database closed"));

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
function userCreate ( first_name, last_name, phone_number, hash_password) {
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
            // console.log("error in userCreate" + err.message);
            return null;
        }
        // console.log("New User: " + user);
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
function jobCreate(job_title, description, wage, address, employerID) {
    var job = new Job();
    if (job_title != false) job.job_title = job_title;
    if (description != false) job.description = description;
    if (wage != false) job.wage = wage;
    if (address != false) job.address = address;
    if (employerID != false) job.employer = employerID;

    // auto set
    job.employee = undefined;
    job.created_at = new Date();
    job.deleted_at = undefined;
    job.is_deleted = false;
    job.is_compeleted = false;
    job.is_active = false;
    
    // save the job
    console.log("before");
    return job.save();
    // try {
    //     await job.save();
    //     return {is_error: false};
    // } catch (err) {
    //     return {is_error: true , errorMessage: err.message};
    // }

}


/**
 * Init a dummy user
 */
async function initUser() {
    return await userCreate("Osama", "Dawood", "6047243630", "YouLikeThat?");
}


/**
 * Init a dummy job
 * 
 * On Success: return 
 */
async function initJob(next) {
    await User.findOne(function(err, employer){
        if(err) {
            console.log("fuck");
            return err;
        }
        console.log("fuck");
        console.log(employer._id);
        return jobCreate("Meat Beat", "I like it like that", 100, "wain", employer._id);
    });
    // var fuck = new ObjectID(employerID);
    // console.log(employerID  );
    // console.log(employerID);
    // console.log(mongoose.Types.ObjectId(employerID));
    // console.log(mongoose.Types.ObjectId("5bcc0c8b5a7d7755e83233b1"));
    // return await jobCreate("Meat Beat", "I like it like that", 100, "wain", employerID);
    // , (err, employer) =>{
    //     if(err)
    //         return next(err);
    //     return 0; //jobCreate("Meat Beat", "I like it like that", 100, "wain", employerID);
    // mongoose.Types.ObjectId("5bcc0c8b5a7d7755e83233b1")
    // });
}

/**  
 * CAUTION: this function will init your database.
 * 
 * Note: this function is useful for development 
 * 
 * Usage: Make sure you wipe out your db first then use this fucntion to creater
 *        dummy user and job by running node populatedb in the terminal.
 */
async function init() {
    // initUser().then(() => {
    //     initJob().then(() => {
    //         console.log("Bye Bye!");
    //         // mongoose.connection.close();     
    //     }, (error) => {
    //         console.log("FAILED INITIALIZING JOB: " + error.message );
    //     });   
    // }, (error) => {
    //     console.log("FAILED INITIALIZING JOB: " + error.message);
    // });

    initUser().then(() => {
        setTimeout(function(){ initJob().then(() => {
            console.log("bye bye");
            // mongoose.connection.close();
        }).catch((err) => {
            console.log(err);
        }); }, 1000)
        
    }).catch((err) => {
        console.log(err);
    });
}


init();

