const app = "../server";
const auth = require("./auth/auth");
const job = require("./job/job");

module.exports = function (app)
{
  // auth routes
  app.post("/auth/create-user", auth.createUser);
  app.get("/auth/user-exists", auth.doesUserExist);
  app.get("/auth/sign-in", auth.userSignIn);

  app.post("/create-job", job.createJob);

  app.get("/job/can-apply", job.isAbleToApply);
  app.post("/job/apply", job.applyForJob);
  app.post("/auth/update-user-job-preference", auth.updateUserJobPreference);

  app.get("/get-all-jobs", job.getAllJobs);
  app.get("/get-all-jobs-Ranked", job.getAllJobsRanked);

  app.get("/get-employer-jobs", job.getEmployerJobs);

  app.get("/job/get-taken-jobs", job.getAppliedForJobs);

  app.post("/job/complete-a-job", job.completeJob);

  app.post("/job/accept-an-applicant", job.acceptAnApplicant);

  app.get("/job/get-job-types", job.getJobTypes);

  // manage account
  app.post("/auth/change-user-info", auth.changeUserInfo);
  app.post("/auth/change-user-password", auth.changeUserPassword);
};
