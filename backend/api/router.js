import { app } from '../server';
var auth = require('./auth/auth');
var job = require('./job/job');

module.exports = function (app)
{
  // auth routes
  app.post('/auth/create-user', auth.createUser);
  app.get('/auth/user-exists', (req, res) =>
  {
    return res.status(200).json({ phoneNumber: req.query.phoneNumber });
  });
  app.get('/auth/sign-in', auth.userSignIn);

  app.post('/create-job', job.createJob);

  app.post('/applyForJob', (req, res) => {
    res.sendStatus(200);
    console.log("User applied for a job, add job details here.");
  })

  app.get('/get-all-jobs', job.getAllJobs);

  app.get('/get-employer-jobs', job.getEmployerJobs);
}
