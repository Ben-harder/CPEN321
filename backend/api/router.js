import { app } from '../server';
var auth = require('./auth/auth');

module.exports = function(app) {
  app.get('/hello', (req, res) =>
    res.send('Hello World!')
  );

  app.post('/create-user', (req, res) => {
    auth.createUser(req.body);
    return res.sendStatus(200);
  });

  app.get('/user-exists', (req, res) => {
    return res.status(200).json({ phoneNumber: req.query.phoneNumber });
  });

  app.post('/job', (req, res) => {
    console.log(req.body);
  });
}
