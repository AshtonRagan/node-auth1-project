const express = require("express");
const router = express.Router();
const crypt = require("bcryptjs");
const userdata = require("../users/users-Model");

router.post("/login", (req, res) => {
  const { userName, passWord } = req.body;

  if (userName && passWord) {
    userdata
      .findUser({ userName })
      .first()
      .then(user => {
        console.log("USER", user);
        if (user && crypt.compareSync(passWord, user.passWord)) {
          req.session.loggedIn = true;
          req.session.username = user.username;

          res.status(200).json({ message: `Welcome ${user.userName}!` });
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
  } else {
    console.log("ERROR!!!");
  }
});

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = crypt.hashSync(user.passWord, 8);
  user.passWord = hash;

  userdata
    .addUser(user)
    .then(user => {
      console.log("USER", user);
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy();
    res.status(200).json({ Message: "You have logged out" });
  } else {
    res.status(500).json({ Message: "You have to be logged in" });
  }
});

module.exports = router;
