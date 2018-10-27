var mongoose = require("mongoose");

//Define a schema
var Schema = mongoose.Schema;

/* 
 * An image is associated with one user
 */
var Image = new Schema({
    image_src: {
        type: String,
        required: true
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
    // one user
    user: {
            type: Schema.Types.ObjectId,
            ref: "User"
    }
});

// Virtual for image"s URL
Image
.virtual("url")
.get(function () {
  return "/image" + this.image_id;
});

// export function to create "Image" model class
module.exports = mongoose.model("Image", Image);
