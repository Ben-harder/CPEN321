var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

/* 
 * Associated with a pair of users. The emplyer is a
 * required field, however the employee is not.
 */
var Job = new Schema({
    job_title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    wage: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    employer: {
        type: Schema.ObjectId,
        required: true
        ref: 'User',
    },
    employee: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    created_at: {
        type: Date,
        required: true
    },
    deleted_at: {
        type: Date
    },
    is_deleted: {
        type: Boolean,
        required: true
    },
    is_compeleted: {
        type: Boolean,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    }
});

// Virtual for job's URL
Job
.virtual('url')
.get(function () {
  return '/job' + this.job_id;
});

// export function to create "Job" model class
module.exports = mongoose.model('Job', Job);
