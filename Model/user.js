const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    myImages: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "image",
        default: null
    },
    date: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model("user", userSchema);