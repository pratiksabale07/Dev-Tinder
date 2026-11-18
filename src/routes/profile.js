const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/middleware");

profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("User does not exist");
        }
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err);
    }
})

module.exports = { profileRouter };