var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

/* 
 * Associated with a user and their job preference.
 */
var JobPref = new Schema({
  user: {
    type: Schema.ObjectId,
    required: true,
    ref: "User"
  },
  stats: [{
    job_type: {type: String, enum: ['Feed My Lizard', 'Beat My Beef', 'Wain My Wain']},
    num_of_occurrences: Number
  }]
});

// export function to create "JobPref" model class
module.exports = mongoose.model("JobPref", JobPref);
