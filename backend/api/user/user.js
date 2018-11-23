var User = require("../../models/user");
var JobPref = require("../../models/jobPref");


module.exports = {

  /**
   * Update job preference of this job.
   * Takes job_pref id
   */
  updateUserJobPreference(req, res) {
    let ret = {};
    console.log(req.body);
    if (!req.body.jobPrefID) {
      ret.errorMessage = "Job preference is a required field"
      return res.status(500).send(ret);
    }
    JobPref.findOneAndUpdate({_id: req.body.jobPrefID, "stats.job_type": req.body.jobType},
    {$inc : {"stats.$.num_of_occurrences": 1} },
    {upsert: true},
    function(err, jobPref) {
      // err
      console.log(err);
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
}