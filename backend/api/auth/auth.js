const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('../../models/user');
var Job = require('../../models/job');
var database = require('../../populatedb');

module.exports = {
  createUser(req, res) {
    let ret = {};
    // if a field is missing return an error
    if (!req.body || !req.body.phoneNumber || !req.body.password || !req.body.passwordConfirm
      || !req.body.firstName || !req.body.lastName) {
      ret.errorMessage = 'All fields have not been filled out';
      return res.status(400).send(ret);
    }

    // check to see if the passwords match
    if (req.body.password !== req.body.passwordConfirm) {
      ret.errorMessage = 'Passwords do not match';
      return res.status(400).send(ret);
    }

    // create a new user
    var user = new User();
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
    user.jobs = [];
    
    /* NEED TO USE VALIDATOR*/

    // save the user
    user.save(function (err) {
        console.log("reached");
        if (err) {
          ret.errorMessage = err.message;
          return res.status(500).send(ret);
        }
        console.log('New User: ' + user);
        return res.status(200).send(user);
    });
  },

  //
  userSignIn(res, req) {
    User.findOne({phone_number : req.body.phone_number}, function(err, user) {
      if (err){
        return res.status(400).send(uesr);
      }
      console.log(req.body.password);
      // validata password 
      user.comparePassword(req.body.password, function(err, isMatch) {
        // internal error
        if (err) {
          console.log("Error in compare password");
          return res.status(500).send(user);
        }
        // bad request(
        if(!isMatch) {
          console.log("PW does not match");
          return res.status(400).send(user);
        }
        console.log("PW matches");
        // success
        return res.status(200).send(user);
      });
    });
  }

};