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
    Job.find({}).populate('employer').exec(function(err, jobs) {
      let ret = {};
      if (err){
        ret.errorMessage = ("Internal error in the database!");
        return res.status(500).send(ret);
      }
      return res.status(200).send(jobs); 
    });
  },
  
  /**
   * Get an employer's job list and respond with the list with the employer's 
   * job.
   */
  getEmployerJobs(req, res) {
    Job.find({employer : req.query.employer}).populate({ path :'employer', select:'first_name last_name'})
    .exec(function(err, jobs) {
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
   * Chack if it's valid for the user to apply to the specified job.
   * 
   * Send back a responce with a boolean success value.
   */
  isAbleToApply(req, res) {
    Job.findById(req.body.jobID).populate('employer', '_id').exec(function(err, Job){
      let ret = {};
      // internal error
      if (err) {
        ret.errorMessage = "Internal error in database";
        return res.status(500).send(ret);
      }
      // is the emplyer
      if (Job.employer._id == req.body.applicantID)  {
        ret.errorMessage = "You can't apply to your own job";
        ret.success = false;
        return res.status(500).send(ret);
      }
      // is not the emplyer
      else {
        ret.success = true;
        return res.status(500).send(ret);
      }
    });
  },
  
  /**
   * User will be added in the job's list of applicants
   */
  applyForJob(req, res) {
    Job.findByIdAndUpdate(req.body.jobID,  {$push: {applicants: req.body.userID}},
    {upsert:true}, function(err, doc){
      let ret = {};
      if (err) {
        ret.errorMessage = "Internal error in database";
        return res.status(500).send(ret);
      }
      ret.successMessage = "Applied successfully"
      return res.status(200).send(ret);
    });
  },

 /*BAD IMPLEMENTAION: O(n^2). SHOULD INSTEAD ADD AN APPLICATION LIST IN THE USER SCHEMA*/

  /**
   * Get an employee's job list and respond with the list of jobs to that
   * were taken by that emplyee
   */
  getAppliedForJobs(req, res) {
    // declare the queries 
    console.log('employeeID', req.query.employeeID);
    const findQuery = {applicants: {$elemMatch: {$eq: req.query.employeeID}}};
    const populateQuery = {path :'employer', select:'first_name last_name'};
    // process the query
    Job.find(findQuery)
    .populate(populateQuery)
    .exec(function(err, jobs) {
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
  //var populateQuery = [{path:'books', select:'title pages'}, {path:'movie', select:'director'}];
// { "instock": { $elemMatch: { qty: 5, warehouse: "A" } } }

}