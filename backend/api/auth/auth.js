const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = {
  createUser(req, res) {
    // if a field is missing return an error
    if (!req.body || !req.body.phoneNumber || !req.body.password || !req.body.passwordConfirm) {
      ret.error = 'All fields have not been filled out';
      return ret;
    }

    // check to see if the passwords match
    if (reqBody.password !== reqBody.passwordConfirm) {
      ret.error = 'Passwords do not match';
      return ret;
    }

    // mongo call create user

  }
};