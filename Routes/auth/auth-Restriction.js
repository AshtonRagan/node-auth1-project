const crypt = require("bcryptjs");

const Users = require("../users/users-Model");

module.exports = (req, res, next) => {
  let { username, password } = req.headers;

  console.log("RESTRICTED:", username);
  if (username && password) {
    const userName = username;
    const passWord = password;
    Users.findUser({ userName })
      .first()
      .then(user => {
        if (user && crypt.compareSync(passWord, user.passWord)) {
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(({ name, message, stack }) => {
        res.status(500).json({ name, message, stack });
      });
  } else {
    res.status(400).json({ error: "please provide credentials" });
  }
};
