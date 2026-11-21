const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = ["firstName", "lastName", "photoURL", "gender", "skills"]

// Get all the pending connection request for all loggedIn users
userRouter.get("/user/request/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequest = await ConnectionRequestModel.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", USER_SAFE_DATA);
        res.json({ message: "Data fetched", connectionRequest });
    } catch (e) {
        res.status(400).send("ERROR " + e);
    }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionsPresent = await ConnectionRequestModel.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" },
            ]
        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA);
        const data = connectionsPresent.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            } else {
                return row.fromUserId;
            }
        })

        res.json({ message: "Connections Present", data });
    } catch (e) {
        res.status(400).send("ERROR" + e);
    }
});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
        // find all connections requests (sent + received)
        const connectionRequests = await ConnectionRequestModel.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");
        const hideUsersFromFeed = new Set();
        connectionRequests.forEach((request) => {
            hideUsersFromFeed.add(request.fromUserId.toString());
            hideUsersFromFeed.add(request.toUserId.toString());
        });
        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);
        res.send(users);
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
});

module.exports = userRouter;