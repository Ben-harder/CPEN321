var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

/* 
 * A user is by default and employee. They can become an emplyer 
 * if they desire.
 */
var User = new Schema({
    first_name: {
        type: String,
        required: [true,"First Name is required"]
    },    
    last_name: {
        type: String,
        required: [true, "Last Name is required"],
    },    
    phone_number: {
        type: String,
        required: [true, "Phone Number is required"],
    },
    hash_password: {
        type: String,
        required: [true, "Password is required"],
        // 6-16 digits
        min : [100000, "Password is too short"],
        max : [9999999999999999, "Password is too long"]
    },
    verification_token: {
        type: String,
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
    profile_picture: {
        type: Schema.ObjectId,
        ref: "Image"
    },
    // array of imgs
    images: [{
        type: Schema.ObjectId,
        ref: "Image"
    }],
    job_pref: {
        type: Schema.ObjectId,
        ref: "JobPref"
    },
    up_votes: {
        type: Number,
        required: true
    },
    down_votes: {
        type: Number,
        required: true
    },
    taken_jobs: {
        type: Number,
        required: true
    },
    posted_jobs: {
        type: Number,
        required: true
    }
});

// // Virtual for user"s URL
// User
// .virtual("url")
// .get(function () {
//   return "/user" + this.user_id;
// });

// // Virtual for user"s full name
// User
// .virtual("name")
// .get(function () {
//   return this.name.last + ", " + this.name.first;
// });

// export function to create "User" model class
module.exports = mongoose.model("User", User);
