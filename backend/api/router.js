import { app } from '../server';

module.exports = function(app) {
  app.get('/hello', (req, res) =>
    res.send('Hello World!')
  );

  app.post('/create-user', (req, res) => {
    console.log(req.body);
    return res.sendStatus(200);
  });

  app.get('/user-exists', (req, res) => {
    return res.status(200).json({ phoneNumber: req.query.phoneNumber });
  });
}
