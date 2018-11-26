const app = "../server";
const auth = require("./auth/auth");
const job = require("./job/job");
const user = require("./user/user");

module.exports = function (app) {
  // auth routes
  app.post("/auth/create-user", auth.createUser);
  app.get("/auth/user-exists", auth.doesUserExist);
  app.get("/auth/sign-in", auth.userSignIn);

  // user routes
  app.post("/user/change-info", user.changeUserInfo);
  app.post("/user/update-password", user.changeUserPassword);
  app.post("/user/update-job-preference", user.updateUserJobPreference);
  app.post("/user/rate-user", user.rateUser);
  app.get("/user/get-user-profile", user.getUserProfile);

  // job routes
  app.post("/job/create-job", job.createJob);
  app.get("/job/can-apply", job.isAbleToApply);
  app.post("/job/apply", job.applyForJob);
  app.get("/job/get-all-jobs", job.getAllJobs);
  app.get("/job/get-all-jobs-ranked", job.getAllJobsRanked);
  app.get("/job/get-employer-jobs", job.getEmployerJobs);
  app.get("/job/get-applied-for-jobs", job.getAppliedForJobs);
  app.post("/job/complete-a-job", job.completeJob);
  app.get("/job/can-afford-job", job.employerCanAffordJob);
  app.post("/job/charge-employer", job.chargeEmployer);
  app.post("/job/accept-an-applicant", job.acceptAnApplicant);
  app.get("/job/get-job-types", job.getJobTypes);
  app.post("/job/cancel-job", job.deleteJob);
  app.post("/job/cancel-application", job.deleteJobApplication);
  app.get("/job/get-employee-active-jobs", job.getEmployeeActiveJobs);
  app.get("/job/get-job-applicants", job.getJobApplicants);
  app.post("/job/pay-employee", job.payEmployee);
  
};
