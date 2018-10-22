var Job = require('../../models/job');
var database = require('../../populatedb');

module.exports = {
  getAllJobs(req, res) {
    let ret = {};
    var userList = [];
    var i = 0;  
    Job.find({}, function(err, users) {
      if (err){
        return res.status(500).send(ret);
      }
      users.forEach(function(user) {
        userList[i] = user;
        i++;
      });
      return res.status(200).send(userList); 
    });
  },
  createJob(req, res) {
    var job = new Job();
    // job.job_title = req.body.jobType;
    // job.description = req.body.description;
    // job.wage = req.body.wage;
    // job.address = req.body.address;
    // job.employer = employerID;

    // job.employee = undefined;
    // job.created_at = new Date();
    // job.deleted_at = undefined;
    // job.is_deleted = false;
    // job.is_compeleted = false;
    // job.is_active = false;
  }
}