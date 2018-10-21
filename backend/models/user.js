var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

/* 
 * A user is by default and employee. They can become an emplyer 
 * if they desire.
 */
var User = new Schema({
    user_id: {
        type: String,
        required: true
    },
    full_name: {
        first: String,
        last:String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    hash_password: {
        type: String,
        required: true,
        // 6-16 digits
        min : 100000,
        max : 9999999999999999
    },
    verification_token: {
        type: String,
        required: true, 
        // 8 digits
        min : 10000000,
        max : 99999999
    },
    working_job_id: {
        type: String
    },
    // status values
    is_working: {
        type: Boolean
    },
    is_verified: {
        type: Boolean
    },
    is_employer: {
        type: String,
        required: true
    },
    // array of imgs
    images: [{
            type: Schema.Types.ObjectId,
            ref: 'Image'}
    ],
    // array of jobs
    jobs: [{
            type: Schema.Types.ObjectId,
            ref: 'Job'}
    ]
});

// Virtual for user's URL
User
.virtual('url')
.get(function () {
  return '/user' + this.user_id;
});

// Virtual for user's full name
User
.virtual('name')
.get(function () {
  return this.name.last + ', ' + this.name.first;
});

// export function to create "User" model class
module.exports = mongoose.model('User', User);
