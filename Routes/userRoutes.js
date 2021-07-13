require("dotenv").config();
const express = require("express");
const Router = express.Router();
const User = require("../Model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

Router.post("/signup", async(req, res) => {
    try {
        let user = await User.findOne({email: req.body.email});

        if(user){
            return res.json({message: "User already exists, please sign in"})
        }

        user = new User({
            ...req.body
        });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(201).json({message: "User Registered successfully, Please sign in", data: user});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Unable to Sign up", error:error.message})
    }
});

Router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email }).populate("myImages");

        if (!user){
            return res.status(404).json({ message: "User not found, Please signup first", error:"User not found, Please signup first"});
        }

        const passwordCheck = await bcrypt.compare(req.body.password, user.password);
        if(!passwordCheck) {
            return res.json({ message: "Invalid Passowrd!", error: "Invalid Passowrd!"})
        };

        const token = await jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "6h" });

        res.status(200).json({ message: "User successfully logged in", data: user, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to Login", error: error.message });
    };
});





module.exports = Router;