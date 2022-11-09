const { Router } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { Usermodel } = require("../models/User.model");

const userController = Router();

userController.post("/signup", (req, res) => {
  const { username, email, password, IP_address } = req.body;
  bcrypt.hash(password, 5, async function (err, hash) {
    if (err) {
      res.send({ message: "something went wrong, please try later" });
    }
    const new_user = Usermodel({
      username,
      email,
      password: hash,
      IP_address,
    });
    console.log(new_user);
    try {
      await new_user.save();
      res.send({ message: "Signup successful" });
    } catch (err) {
      console.log(err);
      res.send({ message: "Something went wrong, please try later" });
    }
  });
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await Usermodel.findOne({ email });
  const hash_password = user.password;

  bcrypt.compare(password, hash_password, function (err, result) {
    if (err) {
      res.send({ message: "something went wrong, please try later" });
    }
    if (result) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.send({ message: "Login successful", token });
    } else {
      res.send({
        message: "email and password doesn't match...",
      });
    }
  });
});

module.exports = {
  userController,
};
