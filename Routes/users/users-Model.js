//database stuff
const db = require("../../data/dbConfig");
module.exports = {
  allUsers,
  addUser,
  findUser,
  findUserById
};

function allUsers() {
  return db("Users");
}

function addUser(body) {
  return db("Users")
    .insert(body)
    .then(ids => {
      const [id] = ids;
      return findUserById(id);
    });
}

function findUser(name) {
  return db("Users").where(name);
}

function findUserById(id) {
  return db("Users")
    .where({ id })
    .first();
}
