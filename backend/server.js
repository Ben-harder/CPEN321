import express from 'express';
import bodyParser from 'body-parser';

// Initialize http server
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle / route
app.get('/hello', (req, res) =>
  res.send('Hello World!')
);

app.post('/create-user', (req, res) => {
  console.log(req.body);
});

app.post('/job', (req, res) => {
  console.log(req.body);
});

// Launch the server on port 3001
const server = app.listen(3001, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});
