import { app } from '../server';
var auth = require('./auth/auth');
var job = require('./job/job');

module.exports = function (app)
{
  app.get('/hello', (req, res) =>
    res.send('Hello World!')
  );

  app.post('/create-user', auth.createUser);

  app.get('/user-exists', (req, res) =>
  {
    return res.status(200).json({ phoneNumber: req.query.phoneNumber });
  });

  app.post('/job', (req, res) =>
  {
    console.log(req.body);
  });

  app.post('/applyForJob', (req, res) => {
    res.sendStatus(200);
    console.log("User applied for a job, add job details here.");
  })

  app.get('/get-all-jobs', job.getAllJobs);
}
