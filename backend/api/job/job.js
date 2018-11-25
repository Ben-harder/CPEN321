var Job = require('../../models/job');
var User = require('../../models/user');
var JobPref = require('../../models/jobPref');
var database = require('../../initdb');

module.exports = {
  createJob(req, res) {
    let ret = {};
    var job = new Job();
    // if a field is missing return an error
    if (!req.body || !req.body.jobType || !req.body.description || req.body.wage === undefined
      || !req.body.address || !req.body.employerID) {
      ret.errorMessage = 'All fields have not been filled out';
      return res.status(400).send(ret);
    }

    // 0 wage
    if (req.body.wage == 0) {
      ret.errorMessage = "Employees won't work for free!";
      return res.status(400).send(ret);
    }

    // negative wage
    if (req.body.wage < 0) {
      ret.errorMessage = "Woah! employees won't work AND pay you money!";
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
      User.findOneAndUpdate({_id: req.body.employerID},
      {$inc: {posted_jobs: 1}},
      {upsert:false}, 
      (err, user) => {
        // err
        if (err){
          let ret = {};
          ret.errorMessage = "Internal error in database"; 
          return res.status(500).send(ret);
        }
        // success
        return res.status(200).send(job);
      });
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

  /**NAIEVE IMPLEMENTATION IN TERMS OF O()**/

  /**
   * Get a list of all jobs
   */
  getAllJobsRanked(req, res) {
    // null user
    let ret = {};
    if (req.query.userID === undefined) {
      ret.errorMessage = 'User is a required field';
      return res.status(500).send(ret);
    }

    Job.find({
      $and: [
        {employer : {$ne: req.query.userID}}, 
        {is_deleted: false}
      ]
    })
    .populate('employer')
    .exec((err, jobs) => {
      let ret = {};
      if (err){
        ret.errorMessage = ("Internal error in the database!");
        return res.status(500).send(ret);
      }

      // check if no jobs
      if (jobs.length == 0){
        return res.status(200).send(jobs);
      }
      
      User.findById(req.query.userID)
      .populate('job_pref')
      .exec((err, user) => {

        // if ranking failed,
        if (!user){
          return res.status(200).send(jobs);
        }

        let ret = {};
        if (err){
          ret.errorMessage = ("Internal error in the database!");
          return res.status(500).send(ret);
        }
        // sort according to preference
        var jobsArray = jobs;
        var retArray = [];
        var stats = user.job_pref.stats;
        var maxOccur = 0;
        var maxOccurIndex = 0;
        // sort
        while (stats.length > 0 && jobsArray.length > 0) {
          maxOccur = 0;
          maxOccurIndex = 0;
          // find max
          for (var i = 0; i < stats.length; i++) {
            // new max
            if (maxOccur < stats[i].num_of_occurrences) {
              maxOccur = stats[i].num_of_occurrences;
              maxOccurIndex = i;
            }
          }
          // push top preferences
          for (var j = 0; j < jobsArray.length; j++) {
            if(jobsArray[j].job_title === (stats[maxOccurIndex].job_type)) {
              retArray.push(jobsArray[j]);
            }
          }
          // remove from stats 
          stats.splice(maxOccurIndex, 1);
        }
        
        // return sorted job array
        return res.status(200).send(retArray); 
      });
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
        return res.status(500).send(jobs);
      }
      return res.status(200).send(jobs); 
    });
  },

  /**
   * Chack if it's valid for the user to apply to the specified job.
   * 
   * Send back a responce with a boolean success value.
   */
  isAbleToApply(req, res) {
    let hasApplied = false;

    let ret = {};
    // null query
    if (!req.query) {
      ret.errorMessage = 'Null query';
      return res.status(500).send(ret);
    }
    // null user
    if (!req.query.userID) {
      ret.errorMessage = 'User is a required field';
      return res.status(500).send(ret);
    }
    // null job
    if (!req.query.jobID) {
      ret.errorMessage = 'Job is a required field';
      return res.status(500).send(ret);
    }

    Job.findById(req.query.jobID)
    .populate('employer', '_id')
    .populate('applicants', '_id')
    .exec(function(err, job){
      let ret = {};

      // internal error
      if (err) {
        ret.errorMessage = "Internal error in database";
        return res.status(500).send(ret);
      }
      // is the emplyer
      if (job.employer._id == req.query.userID)  {
        ret.errorMessage = "You can't apply to your own job";
        return res.status(400).send(ret);
      }
      // already applied 
      job.applicants.forEach(applicant => {
        if (applicant._id == req.query.userID) {
          hasApplied = true;
        }
      });
      if (hasApplied) {
        ret.errorMessage = "You have already applied to this job";
        return res.status(400).send(ret);
      }

      //success
      return res.sendStatus(200);
    });
  },
  
  /**
   * User will be added in the job's list of applicants
   */
  applyForJob(req, res) {
    let ret = {};
    // null user
    if (!req.body.userID) {
      ret.errorMessage = 'User is a required field';
      return res.status(500).send(ret);
    }
    // null job
    if (!req.body.jobID) {
      ret.errorMessage = 'Job is a required field';
      return res.status(500).send(ret);
    }
    Job.findByIdAndUpdate(req.body.jobID,  {$push: {applicants: req.body.userID}},
    {upsert:true}, (err, doc) => {
      let ret = {};
      if (err) {
        ret.errorMessage = "Internal error in database";
        return res.status(500).send(ret);
      }
      return res.sendStatus(200);
    });
  },

 /*BAD IMPLEMENTAION: O(n^2). SHOULD INSTEAD ADD AN APPLICATION LIST IN THE USER SCHEMA*/

  /**
   * Get an employee's job list and respond with the list of jobs to that
   * were taken by that emplyee
   */
  getAppliedForJobs(req, res) {
    if (!req.query.employeeID) {
      let ret = {};
      ret.errorMessage = "User is a required field";
      return res.status(500).send(ret);
    }
    // declare the queries
    const findQuery = {applicants: {$elemMatch: {$eq: req.query.employeeID}}};
    const populateQuery = {path :'employer', select:'first_name last_name'};
    // process the query
    Job.find(findQuery)
    .populate(populateQuery)
    .exec(function(err, jobs) {
      if (err){
        return res.status(500).send(jobs);
      }
      return res.status(200).send(jobs); 
    });
  },

  /**
   * Mark a taken job as complete.
   */
  completeJob(req, res) {
    if (!req.body.jobID) {
      let ret = {};
      ret.errorMessage = "Job is a required field";
      return res.status(500).send(ret);
    }
    Job.findByIdAndUpdate(req.body.jobID,  {$set: {is_compeleted: true}},
      {upsert:false}, (err, job) => {
        // err
        if (err){
          let ret = {};
          ret.errorMessage = "Internal error in database"; 
          return res.status(500).send(ret);
        }
        // can't find one
        if (!job){
          let ret = {};
          ret.errorMessage = "This job no longer exists"; 
          return res.status(500).send(ret);
        }
        // job is not taken yet
        if (!job.is_active){
          let ret = {};
          ret.errorMessage = "You can't complete a job you haven't teken"; 
          return res.status(400).send(ret);
        }
        // success
        return res.status(200).send(job);
    });
  },

  /**
   * Mark a taken job as complete.
   * Clear array
   */
  acceptAnApplicant(req, res) {
    // null job
    if (!req.body.jobID) {
      let ret = {};
      ret.errorMessage = "Job is a required field";
      return res.status(500).send(ret);
    }
    // null user
    if (!req.body.userID) {
      let ret = {};
      ret.errorMessage = "User is a required field";
      return res.status(500).send(ret);
    }
    Job.findOneAndUpdate({
      _id: req.body.jobID ,
      applicants: {$elemMatch: {$eq: req.body.userID}},
      is_active: false
    },  
      {$set: {
        is_active: true,
        employee: req.body.userID,
        applicants: []
      }
    },
      {new: true,
      upsert:false
    },
    (err, job) => {
      // err
      if (err){
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      // can't find one
      if (!job){
        let ret = {};
        ret.errorMessage = "This job is either already assigned or applicant is no longer interested"; 
        return res.status(400).send(ret);
      }
      User.findOneAndUpdate({_id: req.body.userID},
      {$inc: {taken_jobs: 1}},
      {upsert:false}, 
      (err, user) => {
        // err
        if (err){
          let ret = {};
          ret.errorMessage = "Internal error in database"; 
          return res.status(500).send(ret);
        }
        // success
        return res.status(200).send(job);
      });
    });
  },

  /**
   * Get all the job types.
   */
  getJobTypes(req, res) {
    let ret = JobPref.schema.path('stats').schema.path('job_type').enumValues;
    return res.status(200).send(ret);
  },

  /**
   * Get all the job types.
   */
  deleteJob(req, res) {
    // null job
    if (!req.body.jobID) {
      let ret = {};
      ret.errorMessage = "Job is a required field";
      return res.status(500).send(ret);
    }
    // null job
    if (!req.body.userID) {
      let ret = {};
      ret.errorMessage = "User is a required field";
      return res.status(500).send(ret);
    }
    Job.findOneAndRemove({ 
    _id: req.body.jobID,
    employer: req.body.userID,
    $or: [
      {is_compeleted : true},
      {is_active : false}
    ]},
    (err, job) => {
      // err
      if (err){
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      if(!job) {
        let ret = {};
        ret.errorMessage = "Job is either in progress or previously deleted"; 
        return res.status(400).send(ret);
      }
      return res.status(200).send(job);  
    });
  },

  /**
   * Delete job application.
   */
  deleteJobApplication(req, res) {
    // null job
    if (!req.body.jobID) {
      let ret = {};
      ret.errorMessage = "Job is a required field";
      return res.status(500).send(ret);
    }
    // null job
    if (!req.body.userID) {
      let ret = {};
      ret.errorMessage = "User is a required field";
      return res.status(500).send(ret);
    }
    const findQuery = {applicants: {$elemMatch: {$eq: req.body.userID}}};
    Job.findOneAndUpdate(findQuery, 
    {$pull: {applicants: req.body.userID}},
    {upsert:false,
    new: true},
    (err, job) => {
      // err
      if (err) {
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      if(!job) {
        let ret = {};
        ret.errorMessage = "Job is either in progress or previously deleted"; 
        return res.status(400).send(ret);
      }
      return res.status(200).send(job);  
    });
  },

  /**
   * Get my active jobs.
   */
  getEmployeeActiveJobs(req, res) {
    // null job
    if (!req.query.userID) {
      let ret = {};
      ret.errorMessage = "User is a required field";
      return res.status(500).send(ret);
    }
    const findQuery = {$and: [
      {employee: req.query.userID},
      {is_compeleted: false}
    ]};
    Job.find(findQuery) 
    .exec((err, jobs) => {
      // err
      if (err) {
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      // success
      return res.status(200).send(jobs);  
    });
  },

  /**
   * Get all applicants for a specific job if the user
   * is the employer for that job.
   */
  getJobApplicants(req, res) {
    // null job
    if (!req.query.userID) {
      let ret = {};
      ret.errorMessage = "User is a required field";
      return res.status(500).send(ret);
    }
    // null job
    if (!req.query.jobID) {
      let ret = {};
      ret.errorMessage = "Job is a required field";
      return res.status(500).send(ret);
    }
    const findQuery = {$and: [
      {employer: req.query.userID},
      {_id: req.query.jobID}
    ]};
    Job.findOne(findQuery)
    .populate('applicants')
    .exec((err, job) => {
      // err
      if (err) {
        console.log(err);
        let ret = {};
        ret.errorMessage = "Internal error in database"; 
        return res.status(500).send(ret);
      }
      // not user
      if (!job) {
        let ret = {};
        ret.errorMessage = "User is not the employer"; 
        return res.status(500).send(ret);
      }
      // success
      return res.status(200).send(job.applicants);  
    });
  },

  
};

