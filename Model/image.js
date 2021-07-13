const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isPrivate: {
        type: Boolean,
        required: true
    },
    image_by: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        default: null
    }
});

module.exports = mongoose.model("image", imageSchema);