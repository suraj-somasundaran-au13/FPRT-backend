require("dotenv").config();
const mongoose = require("mongoose");
const MongoUri = process.env.MONGOURI;
const MongoInit = async() => {
    try {
        await mongoose.connect(MongoUri, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });
        console.log("DB Connected Successfully!");
    } catch (error) {
        console.log("Error while connecting to DB", error.message);

    }
}

module.exports = MongoInit;