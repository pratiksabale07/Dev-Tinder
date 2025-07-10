const express = require("express");

const app = express();

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Pratik", lastName: "Sabale" });
});

app.use('/data', (req, res, next) => { //request handler
  // res.send('Data 1');
  next();
}, (req, res, next) => {
  // res.send('Data 2');
  next();
}, (req, res, next) => {
  res.send('Data 3');
})

app.listen(7777, () => {
  console.log("Server is successfully listening on port 7777...");
});