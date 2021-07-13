const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: function (req, file, callback) {

        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            let newError = new Error("Only (.png .jpg .jpeg .gif )Images are allowed");
            newError.name = "MulterError";
            console.log("Error: Couldn't pass multer")
            callback(newError, false);
            return
        };
        console.log("Passed through multer")
        callback(null, true);


    }
});

module.exports = upload;