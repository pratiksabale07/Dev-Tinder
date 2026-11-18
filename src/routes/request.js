const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middlewares/middleware")

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " sending request");
})

module.exports = { requestRouter };