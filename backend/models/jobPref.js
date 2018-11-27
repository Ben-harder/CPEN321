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
  /**INVARIANT: A USER HAS TO BE CREATED WITH THEESE**/
  stats: [{
    job_type: {type: String, enum: ['Household Chore', 'Yard Work', 'Car Wash', 'Moving', 'Pet Car', 'Shovel Snow']},
    num_of_occurrences: Number
  }]
});

// export function to create "JobPref" model class
module.exports = mongoose.model("JobPref", JobPref);
