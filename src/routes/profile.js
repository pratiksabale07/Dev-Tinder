const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/middleware");
const { validateEditProfileData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("User does not exist");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateEditProfileData(req)) {
            throw new Error("Invalid Edit Request")
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach(key => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.send(` ${loggedInUser.firstname} your date has been edited`);
    } catch (e) {
        res.status(400).send("ERROR " + e);
    }
});

profileRouter.patch("/profile/updatePassword", async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;
        if (typeof email !== "string" || typeof currentPassword !== "string" || typeof newPassword !== "string") {
            throw new Error("Email, current password, and new password are required");
        }
        if (!validator.isStrongPassword(newPassword)) {
            throw new Error("Please enter a strong new password");
        }

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(currentPassword);
        if (isPasswordValid) {
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();
            res.send("Password updated successfully");
        } else {
            throw new Error("Invalid Credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
});

module.exports = { profileRouter };