require("dotenv").config();
const express = require("express");
const Authrouter = express.Router();
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pbkdf2 = require("pbkdf2");
const salt = crypto.randomBytes(16).toString("hex");
const { UserModel } = require("../models/userModel");
const { validateEmail } = require("../validators/emailvalidator");
const { CheckPassword } = require("../validators/passwordvalidator");
const redis = require("redis");
const client = redis.createClient();
// client.on("error", (err) => {
//   if (err) {
//     console.error("Error connecting to Redis:", err);
//   }
//   console.log("connected to redis successfully");
// });
// client.connect((err) => {
//   if (err) {
//     console.error("Error connecting to Redis server:", err);
//     return;
//   }
//   console.log("Connected to Redis server");
// });
// client.on()

// middle ware for validating that the passwords and emails should be valid
// Authrouter.use(validateEmail);
// Authrouter.use(CheckPassword);

Authrouter.get("/", (req, res) => {
  res.json({ message: "response from authrouter" });
});

Authrouter.post("/login", validateEmail, CheckPassword, async (req, res) => {
  const { name, email, password } = req.body;
  // load the user from db , if user is not there that means he does not even have an
  //account
  try {
    let user = await UserModel.findOne({ email });
    console.log(user.password);
    if (user) {
      // this module of node is amazing because it less abstractive in nature than bcrypt.
      pbkdf2.pbkdf2(
        password,
        user.salt,
        1000,
        64,
        "sha512",
        (err, derivedKey) => {
          if (err) throw err;
          const hash = derivedKey.toString("hex");
          // in hex format , the length will of 128 (65*2);
          console.log(hash, password);
          if (hash === user.password) {
            let accessToken = jwt.sign({id:user._id,email }, process.env.SECRET_KEY, {
              expiresIn: "1d",
            });
            res
              .status(200)
              .json({ message: "successfully login", accessToken });
          } else {
            res.status(401).json({ message: "incorrect password" });
          }
        }
      );
    } else {
      res.status(401).json({
        message:
          "it looks like ,you don't have an account,please register first",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "it looks like ,you don't have an account,please register first" });
  }
});

Authrouter.post("/logout", async (req, res) => {
  //  blacklist the token
  let accessToken = req?.headers?.authorization?.split(" ")[1];
  console.log(`accesstoken is ${accessToken}`);
  try {
    client.sAdd("blacklist", accessToken, (err, result) => {
      if (err) {
        res.status(500).json({ message: "server error" });
      } else {
      }
      res.status(200).json({ message: "logout successfull" });
    });
  } catch (error) {
    console.log(`error while doing blacklisting.the error is ${error}`);
    res.status(500).json({ message: "server error", error });
  }
});

Authrouter.post("/signup", CheckPassword, validateEmail, async (req, res) => {
  let { name, email, password } = req.body;
  console.log({ name, email, password });
  try {
    // check if the user already there or not
    let user = await UserModel.findOne({ email });
    if (!user) {
      if (name) {
        try {
          // now email and password are already verified
          // dump this data to the database.
          // but hash it asychronously first
          pbkdf2.pbkdf2(
            password,
            salt,
            1000,
            64,
            "sha512",
            async (err, derivedKey) => {
              try {
                if (err) throw err;
                const hash = derivedKey.toString("hex");
                // derived key is a 64 bytes buffer or binary data , so convert it to a string with
                // hexadecimal format
                let query = new UserModel({
                  name,
                  email,
                  password: hash,
                  salt,
                });
                await query.save();
                res.status(201).json({ message: "signup successfull" });
              } catch (error) {
                console.log(error);
                res
                  .status(500)
                  .json({ message: "server error , please try again later" });
              }
            }
          );
        } catch (error) {
          res.status(500).json({ message: "something went wrong" });
        }
      } else {
        res.status(401).json({ message: "please send a valid name" });
      }
    } else {
      // so if the already exist.
      res.status(401).json({ message: "user already exist." });
    }
  } catch (error) {
    console.log(
      `error while loading user in signup route the error is  ${error}`
    );
    res.status(500).json({ message: "server error", error });
  }
});

module.exports = { Authrouter, client };
