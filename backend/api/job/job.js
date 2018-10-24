var Job = require('../../models/job');
var database = require('../../initdb');

module.exports = {
  createJob(req, res) {
    let ret = {};
    var job = new Job();
    // if a field is missing return an error
    if (!req.body || !req.body.jobType || !req.body.description || !req.body.wage
      || !req.body.address || !req.body.employerID) {
      ret.errorMessage = 'All fields have not been filled out';
      return res.status(400).send(ret);
    }
    
    job.job_title = req.body.jobType;
    job.description = req.body.description;
    job.wage = req.body.wage;
    job.address = req.body.address;
    job.employer = req.body.employerID;

    job.employee = undefined;
    job.created_at = new Date();
    job.deleted_at = undefined;
    job.is_deleted = false;
    job.is_compeleted = false;
    job.is_active = false;

    // save the job
    job.save(function (err) {
        if (err) {
          ret.errorMessage = err.message;
          return res.status(500).send(ret);
        }
        console.log('New Job: ' + job);
        return res.status(200).send(job);
    });
  },

  /**
   * Get a list of all jobs
   */
  getAllJobs(req, res) {
    Job.find({}).populate().exec(function(err, users) {
      let ret = {};
      if (err){
        ret.errorMessage = ("Internal error in the database!");
        return res.status(500).send(ret);
      }
      return res.status(200).send(userList); 
    });
  },
  
  /**
   * Get an employer's job list and respond with the list with the employer's 
   * job.
   */
  getEmployerJobs(req, res) {
    Job.find({employer : req.query.employer}).populate('employer').exec(function(err, jobs) {
      if (err){
        console.log("Error when finding and populating the job list");
        console.log(err.message);
        return res.status(500).send(jobs);
      }
      // console.log("Success when finding and populating the job list");
      // console.log(jobs);
      return res.status(200).send(jobs); 
    });
  },

    /**
   * Get an employee's job list and respond with the list of jobs to that
   * were taken by that emplyee
   */
  getTakenJobs(req, res) {
    Job.find({employer : res.body.employer}).populate('employer').exec(function(err, jobs) {
      if (err){
        console.log("Error when finding and populating the job list");
        console.log(err.message);
        return res.status(500).send(jobs);
      }
      console.log("Success when finding and populating the job list");
      console.log(jobs);
      return res.status(200).send(jobs); 
    });
  }


}