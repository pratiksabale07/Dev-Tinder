const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require('../utils/validation');
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
    try {
        // Validation of the data
        validateSignUpData(req);

        // Encrypt the password
        const { firstName, lastName, email, password, skills } = req.body;
        const passwordHash = await bcrypt.hash(password, 10)
        //   Creating a new instance of the User model
        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            skills
        });

        await user.save();
        res.send("User Added successfully!");
    } catch (err) {
        res.status(400).send("Error : " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = await user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();
            res.cookie("token", token, { expires: new Date(Date.now() + 8 * 3600000) });
            res.send("Login Sucess");
        } else {
            throw new Error("Invalid Credentials");
        }

    } catch (err) {
        res.status(400).send("ERROR " + err.message)
    }
})

module.exports = { authRouter };