const express = require("express");
var cors = require('cors');
const bodyParser = require("body-parser");

// Initialize http server
const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const router = require("./api/router")(app);

if(!module.parent){
  app.listen(3000);
}


// Launch the server on port 3001
const server = app.listen(3001, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${address}:${port}`);
});

module.exports = server;
