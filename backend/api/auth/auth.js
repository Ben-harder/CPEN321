const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../../models/user");
var JobPref = require("../../models/jobPref");
var Image = require("../../models/image");
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
    var profilePicture = new Image();
    var user = new User();
    user.profile_picture = profilePicture._id;
    profilePicture.user = user._id;
    profilePicture.valid = false;
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
    user.up_votes = 0;
    user.down_votes = 0;
    user.posted_jobs = 0;
    user.taken_jobs = 0;
    user.is_admin = false;
    user.balance = 0;

    jobPref.save((err) => {
        if (err) {
          ret.errorMessage = err.message;
          return res.status(500).send(ret);
        }
        // save the user
        profilePicture.save((err) => {
          if (err) {
            ret.errorMessage = err.message;
            return res.status(500).send(ret);
          }
          // save the user
          user.save((err) => {
              if (err) {
                ret.errorMessage = err.message;
                return res.status(500).send(ret);
              }
              return res.status(200).send(user);
          });
        });
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
  }

};