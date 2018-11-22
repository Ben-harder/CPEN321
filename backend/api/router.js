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

  // job routes
  app.post("/job/create-job", job.createJob);
  app.get("/job/can-apply", job.isAbleToApply);
  app.post("/job/apply", job.applyForJob);
  app.get("/job/get-all-jobs", job.getAllJobs);
  app.get("/job/get-all-jobs-ranked", job.getAllJobsRanked);
  app.get("/job/get-employer-jobs", job.getEmployerJobs);
  app.get("/job/get-taken-jobs", job.getAppliedForJobs);
  app.post("/job/complete-a-job", job.completeJob);
  app.post("/job/accept-an-applicant", job.acceptAnApplicant);
  app.get("/job/get-job-types", job.getJobTypes);
};
