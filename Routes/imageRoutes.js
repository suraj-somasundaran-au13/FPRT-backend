require("dotenv").config();
const express = require("express");
const Router = express.Router();
const User = require("../Model/user");
const Image = require("../Model/image");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../auth/auth");
const upload = require("../utils/multer");
const { cloudinary } = require("../utils/cloudinary");

Router.get("/allimages", async(req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json({message:"Images fetched successfully", data:images});
        
    } catch (error) {
        console.log("error occured:::", error);
        res.status(500).json({message:"Internal server error", error:error.message});
    }
});

Router.post("/addImage", auth, upload.single("image"), async(req, res) => {
    try {
        let user = await User.findById({_id:req.user.id});
        const newImage = new Image({...req.body});

        newImage.image_url = req.file.path;
        newImage.image_by = `${user.firstName} ${user.lastName}`;
        newImage.author = user._id;


        await newImage.save();

        res.status(201).json({message:"Image Uploaded sucessfully", data: newImage});


    } catch (error) {
        console.log("error occured:::", error);
        res.status(500).json({ message: "Error while uploading images", error: error.message });
    };
});

Router.post("/addimagec", auth, async (req, res) => {
    try {
        console.log("Reached till here:1")
        let user = await User.findById({ _id: req.user.id });
        const newImage = new Image({ ...req.body });
        console.log("Reached till here:2")
        const uploadedImage = await cloudinary.uploader.upload(
          req.body.image_url,
          { upload_preset: "ml_default" }
        );
        newImage.image_url = uploadedImage.secure_url
        newImage.image_by = `${user.firstName} ${user.lastName}`;
        newImage.author = user._id;
        console.log(uploadedImage.secure_url);

        await newImage.save();
        user.myImages.push(newImage._id);
        await user.save();

        res.status(201).json({ message: "Image Uploaded sucessfully", data: newImage });


    } catch (error) {
        console.log("error occured:::", error);
        res.status(500).json({ message: "Error while uploading image", error: error.message });
    };
});

Router.get("/myimages", auth, async(req, res) => {
    try {
        const user = await User.findById({ _id: req.user.id }).populate("myImages");
        res.status(200).json({message:"Images fetched successfully", data: user.myImages});
        
    } catch (error) {
        console.log("error occured:::", error);
        res.status(500).json({ message: "Error while fetching images", error: error.message });
    };
});

Router.patch("/updateimage/:id", auth, upload.single("image"), async(req, res) => {
    try {

        let imageToUpdate = await Image.findById({_id: req.params.id});

        if (req.file) {
            req.body.image_url = req.file.path;
        } else {
            req.body.image_url = imageToUpdate.image_url;
        };

        console.log(req.body)
        
        const updatedImage = await Image.findByIdAndUpdate({_id: req.params.id}, {
            $set: {
                ...req.body
            }
        });
        res.status(200).json({
            message:"Image details updated"
        })

    } catch (error) {
        console.log("error occured while updating:::", error);
        res.status(500).json({ message: "Error while updating image", error: error.message });
    }
});

Router.delete("/deleteimage/:id", auth, async(req, res) => {
    try {

        const imageToDelete = await Image.findByIdAndDelete({_id: req.params.id});

        res.status(200).json({message:"Image Deleted Successfully"});
        
    } catch (error) {
        console.log("error occured while deleting:::", error);
        res.status(500).json({ message: "Error while deleting image", error: error.message });
    }
});

Router.get("/profile", auth, async(req, res) => {
    try {
        
        // Write login if necessary else do it on frontend

    } catch (error) {
        console.log("error occured:::", error);
        res.status(500).json({ message: "Error while fetching profile", error: error.message });
    };
});


module.exports = Router;
