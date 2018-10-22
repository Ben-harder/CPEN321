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

  app.post('/job', (req, res) => {
    console.log(req.body);
  });
  
  app.get('/jobList', (req, res) => {
    var index = 0;
    res.send([
      {key: (index++).toString(), value: [
        {jobType: 'Mow lawn'},
        {address: '1234 wain st'},
        {wage: 1},
        {description: 'suck my wain'},
        {author: 'will'},

      ]},
      {key: (index++).toString(), value: [
        {jobType: 'Feed lizard'},
        {address: '9876 fuu blvd'},
        {wage: 100},
        {description: 'fire randy'},
        {author: 'osama'},
      ]},
      {key: (index++).toString(), value: [
        {jobType: 'Clean pool'},
        {address: 'mcloed, UBC'},
        {wage: 100},
        {description: 'bring starbucks'},
        {author: 'ben'},
      ]},
      {key: (index++).toString(), value: [
        {jobType: 'Feed lizard'},
        {address: '9876 fuu blvd'},
        {wage: 100},
        {description: 'fire randy'},
        {author: 'osama'},
      ]},
      {key: (index++).toString(), value: [
        {jobType: 'Feed lizard'},
        {address: '9876 fuu blvd'},
        {wage: 100},
        {description: 'fire randy'},
        {author: 'osama'},
      ]},
      {key: (index++).toString(), value: [
        {jobType: 'Feed lizard'},
        {address: '9876 fuu blvd'},
        {wage: 100},
        {description: 'fire randy'},
        {author: 'osama'},
      ]},
    ]);
  });
}
