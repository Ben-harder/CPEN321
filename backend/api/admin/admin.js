var Job = require('../../models/job');
var User = require("../../models/user");
var JobPref = require("../../models/jobPref");


module.exports = {
  deleteUser(req, res) {
    User.findOneAndRemove({ 
    phone_number: req.body.phoneNumber},
    (err, job) => {
      // err
      if (err){
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      if(!job) {
        let ret = {};
        ret.errorMessage = "User does not exist!"; 
        return res.status(400).send(ret);
      }
      return res.status(200).send(job);  
    });
  },

  refundUser(req, res) {
    console.log(req.body);
    User.findOneAndUpdate({ 
    phone_number: req.body.phoneNumber},
    {$inc: {balance: req.body.amount}},
    {new: true},
    (err, user) => {
      console.log(err);
      // err
      if (err){
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      if(!user) {
        let ret = {};
        ret.errorMessage = "User does not exist!"; 
        return res.status(400).send(ret);
      }
      return res.status(200).send(user);  
    });
  }
};
