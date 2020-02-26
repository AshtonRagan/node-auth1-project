//all the require stuff, that you need to use stuff
const express = require("express");
const userapi = require("./Routes/users/user-Routes");
const authapi = require("./Routes/auth/auth-Routes");
const restricted = require("./Routes/auth/auth-Restriction");
const session = require("express-session");
const knexStore = require("connect-session-knex")(session);
const knex = require("./data/dbConfig");

const server = express();
server.use(express.json());

const sessionConfig = {
  name: "Father Gas",
  secret: "the sweet blood, it sings to me",
  resave: false,
  saveUninitialized: true, // related to GDPR compliance
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false, // should be true in production
    httpOnly: true // true means JS can't touch the cookie
  },
  // remember the new keyword
  store: new knexStore({
    knex,
    tablename: "sessions",
    createtable: true,
    sidfieldname: "sid",
    clearInterval: 1000 * 60 * 15
  })
};

//endpoint routes

server.use(session(sessionConfig));
server.use("/api/users", restricted.lightRes, userapi);
server.use("/api/auth", authapi);

//test point to make sure your sever/api is running
server.get("/", (req, res) => {
  res.status(200).json({ Jarvis: "Awaiting orders, Mr Stark" });
});

//export so server can run..this is your server
module.exports = server;
