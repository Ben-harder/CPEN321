const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var populatedb = require('../../populatedb');

module.exports = {
  createUser(req, res) {
    let ret = {};
    // if a field is missing return an error
    if (!req.body || !req.body.phoneNumber || !req.body.password || !req.body.passwordConfirm
      || !req.firstName || !req.lastName) {
      ret.errorMessage = 'All fields have not been filled out';
      ret.isError = true;
      return res.send(400).json(ret);
    }

    // check to see if the passwords match
    if (reqBody.password !== reqBody.passwordConfirm) {
      ret.errorMessage = 'Passwords do not match';
      ret.isError = true;
      return res.send(400).json(ret);
    }

    // if another error happens
    var retval = populatedb.userCreate(req.firstName, req.lastName, req.body.phoneNumber, req.body.password);
    if(retval == null) {
      ret.errorMessage = 'An error happened in the databas';
      ret.isError = true;
      return res.send(500).json(ret);
    }
    ret.isError = false;
    return res.send(200).json(ret);
  }
};