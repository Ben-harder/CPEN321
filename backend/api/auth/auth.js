const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = {
  createUser(reqBody) {
    // return variable
    let ret = {};
    
    // if a field is missing return an error
    if (!reqBody || !reqBody.phoneNumber || !reqBody.password || !reqBody.passwordConfirm) {
      ret.error = 'All fields have not been filled out';
      return ret;
    }

    // check to see if the passwords match
    if (reqBody.password !== reqBody.passwordConfirm) {
      ret.error = 'Passwords do not match';
      return ret;
    }
  }
};