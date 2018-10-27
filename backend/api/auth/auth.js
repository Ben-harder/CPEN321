const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var User = require("../../models/user");
var Job = require("../../models/job");
var database = require("../../initdb");

var foo = undefined;

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
    var user = new User();
    user.first_name = req.body.firstName;
    user.last_name = req.body.lastName;
    user.phone_number = req.body.phoneNumber;
    user.hash_password = req.body.password;
    user.verification_token = foo;
    user.working_job_id = foo;
    user.is_working = false;
    user.is_verified = false;
    user.is_employer = false;
    user.images = [];
    
    /* NEED TO USE VALIDATOR*/

    // save the user
    user.save(function (err) {
        if (err) {
          ret.errorMessage = err.message;
          return res.status(500).send(ret);
        }
        console.log("New User: " + user);
        return res.status(200).send(user);
    });
  },

  //
  userSignIn(req, res) {
    User.findOne({phone_number : req.query.phoneNumber}, function(err, user) {
      let ret = {};
      if (err) {
        ret.errorMessage = "Error with the database!";
        return res.status(500).send(ret);
      }

      if (!user) {
        ret.errorMessage = "Phone Number does not exist!";
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