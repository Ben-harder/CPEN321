const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var SignUp = require('../../controllers/signUp');

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

    // if another error happens
    var retval = SignUp.userCreate(req.body.firstName, req.body.lastName, req.body.phoneNumber, req.body.password);
    if(retval == null) {
      ret.errorMessage = 'An error happened in the database';
      return res.status(500).send(ret);
    }

    return res.status(200).send(ret);
  }
};