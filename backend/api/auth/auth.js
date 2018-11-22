const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../../models/user");
var JobPref = require("../../models/jobPref");
var Job = require("../../models/job");
var database = require("../../initdb");

module.exports = {
  createUser(req, res) {
    let ret = {};

    // if a field is missing return an error
    if (!req.body || !req.body.phoneNumber || !req.body.password || !req.body.passwordConfirm
      || !req.body.firstName || !req.body.lastName) {
      ret.errorMessage = "All fields have not been filled out";
      return res.status(400).send(ret);
    }

    // check to see if the passwords match
    if (req.body.password !== req.body.passwordConfirm) {
      ret.errorMessage = "Passwords do not match";
      return res.status(400).send(ret);
    }

    // create a new user
    var jobPref = new JobPref();
    var user = new User();
    jobPref.user = user._id;
    jobPref.stats = [
      {job_type: "Feed My Lizard", num_of_occurrences: 0},
      {job_type: "Beat My Beef", num_of_occurrences: 0},
      {job_type: "Wain My Wain", num_of_occurrences: 0}
    ];
    user.first_name = req.body.firstName;
    user.last_name = req.body.lastName;
    user.phone_number = req.body.phoneNumber;
    user.hash_password = req.body.password;
    user.verification_token = undefined;
    user.working_job_id = undefined;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.images = [];
    user.job_pref = jobPref._id;
    
    // save the user
    user.save(function (err) {
        if (err) {
          ret.errorMessage = err.message;
          return res.status(500).send(ret);
        }
        return res.status(200).send(user);
    });
  },

  //
  userSignIn(req, res) {
    if(!req.query || !req.query.phoneNumber || !req.query.password) {
      let ret = {};
      ret.errorMessage = "All fields have not been filled out";
      return res.status(400).send(ret);
    }
    User.findOne({phone_number : req.query.phoneNumber}, function(err, user) {
      let ret = {};
      if (err) {
        ret.errorMessage = "Error with the database!";
        return res.status(500).send(ret);
      }

      if (!user) {
        ret.errorMessage = "Login info is invalid!";
        return res.status(400).send(ret);
      }

      // validate password 
      if (user.hash_password !== req.query.password) {
        ret.errorMessage = "Login info is invalid!";
        return res.status(400).send(ret);
      } else {
        return res.status(200).send(user);
      }
    });
  },

  doesUserExist(req, res) {
    let ret = {};
    if (!req.query.phoneNumber) {
      ret.errorMessage = "User is a required field"
      return res.status(500).send(ret);
    }
    User.findOne({phone_number : req.query.phoneNumber}, function(err, user) {
      let ret = {};
      if (err) {
        ret.errorMessage = "Error with the database!";
        return res.status(500).send(ret);
      }

      if (!user) {
        return res.status(200).send(user);
      }

      ret.errorMessage = "This phone number already has an account!";
      return res.status(400).send(ret);
    });  
  },

  /**
   * Update job preference of this job.
   * Takes job_pref id
   */
  updateUserJobPreference(req, res) {
    let ret = {};
    if (!req.body.jobPrefID) {
      ret.errorMessage = "Job preference is a required field"
      return res.status(500).send(ret);
    }
    JobPref.findOneAndUpdate({_id: req.body.jobPrefID, "stats.job_type": req.body.jobType},
    {$inc : {"stats.$.num_of_occurrences": 1} },
    {upsert: true},
    function(err, jobPref) {
      // err
      if (err){
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      return res.status(200).send(jobPref);
    });
  },
  
  /**
  * Update user info give an ID
  */
  changeUserInfo(req, res) {
    let ret = {};
    // all fields have to be valid
    if (req.body.userID === undefined ||  req.body.phoneNumber === undefined ||
    req.body.firstName === undefined || req.body.lastName === undefined) {
      ret.errorMessage = "All fields have to be filled out";
      return res.status(400).send(ret);
    }
    User.findByIdAndUpdate(req.body.userID,
    {$set: {phone_number: req.body.phoneNumber, first_name: req.body.firstName, last_name: req.body.lastName}},
    {new: true,
    upsert: true},
    (err, user) => {
      // internal err
      if (err){
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      // bad user id
      if (!user){
        let ret = {};
        ret.errorMessage = "User does not exist"; 
        return res.status(500).send(ret);
      }
      return res.status(200).send(user);
    });
  },
  
  /**
  * Update user PW give an ID
  */
  changeUserPassword(req, res) {
    let ret = {};
    // all fields have to be valid
    if (req.body.userID === undefined ||  req.body.password === undefined || req.body.passwordConfirm === undefined) {
      ret.errorMessage = "All fields have to be filled out";
      return res.status(400).send(ret);
    }
    // all fields have to be valid
    if (req.body.password !== req.body.passwordConfirm) {
      ret.errorMessage = "Passwords do not match";
      return res.status(400).send(ret);
    }
    User.findByIdAndUpdate(req.body.userID,
    {$set: {hash_password: req.body.password}},
    {new: true,
    upsert: true},
    (err, user) => {
      // internal err
      if (err){
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      // bad user id
      if (!user){
        let ret = {};
        ret.errorMessage = "User does not exist"; 
        return res.status(500).send(ret);
      }
      return res.status(200).send(user);
    });
  }

};