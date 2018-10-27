var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

/* 
 * List of applications of applicants
 */

var Application = new Schema({
    job_title: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Application", Application);