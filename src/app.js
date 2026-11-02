const express = require("express");
const connectDB = require('./config/database');
const User = require('./models/user')
const app = express();
app.use(express.json());

connectDB().then(() => {
  console.log("Database connected successfully...");
  app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777...");
  });
}).catch((err) => {
  console.error("Database connection failed");
});

app.post('/signup', async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    })
    try{
      await user.save()
      res.send('User added successFully')
    } catch(err) {
      console.error(err)
      res.status(400).send(err.message)
    }
 })