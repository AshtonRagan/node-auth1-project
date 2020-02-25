///api stuff
const express = require("express");
const router = express.Router();
const userData = require("./users-Model");

router.get("/", (req, res) => {
  userData
    .allUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
