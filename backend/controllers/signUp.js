var User = require('../models/user');
var Job = require('../models/job');
var database = require('../populatedb');

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
exports.userCreate = function (first_name, last_name, phone_number, hash_password) {
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
    console.log(user);
    // save the user
    user.save(function (err) {
        console.log("reached");
        if (err) {
            console.log("error in userCreate" + err.message);
            return null;
        }
        console.log('New User: ' + user);
        return true;
    });
}