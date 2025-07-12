const express = require("express");

const app = express();

// Error handling middleware
// Errors can handled by two ways:
// 1. By using try-catch blocks in route handlers (Recommended way)
// 2. By using error-handling middleware use app.use('/') route handler at end of the code

app.get("/admin", (req, res, next) => {
  // try {
    throw new Error("This is an error from the admin route");
  // } catch (err) {
  //   res.status(500).send("An error occurred in the admin route: " + err.message);
  // }
  // res.send("Admin route accessed");
})

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("An error occurred: " + err.message);
  }
})

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});