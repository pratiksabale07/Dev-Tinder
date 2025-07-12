const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/middleware");

const app = express();

// LEARNING MIDDLEWARE
// Middleware function to log request details

// Any request to the server will go through this middleware
// First will check if the user is authorized and then will allow the request to proceed
// This can done by using two ways

// app.use("/admin", adminAuth); // This will check authorization for all routes under /admin and will call next() if authorized
// app.use("/user", userAuth); // This will check authorization for all routes under /user and will call next() if authorized

// OR

app.get("/admin/dashboard", adminAuth, (req, res) => {
  res.send("Welcome to the Admin Dashboard");
})

app.get("/user/profile", userAuth, (req, res) => {
  res.send("Welcome to the User Profile");
})

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});