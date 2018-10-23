console.log("Starting database at port: mongodb://localhost:27017/");

// set up the connection
var ObjectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var mongoDB = "mongodb://127.0.0.1/cpen_321";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('close', () => console.log("database closed"));
