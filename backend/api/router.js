import { app } from '../server';
import SignupService from './auth/signup';

module.exports = function(app) {
  app.get('/hello', (req, res) =>
    res.send('Hello World!')
  );

  app.post('/create-user', (req, res) => {
    console.log(req.body);
    SignupService.createNewUser(req.body); // must have error message handling based on osama's retval.isErr (error is another var in obj)
    return res.sendStatus(200);
  });

  app.get('/user-exists', (req, res) => {
    return res.status(200).json({ phoneNumber: req.query.phoneNumber });
  });

}
