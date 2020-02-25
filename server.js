const express = require("express");
const server = express();
server.use(express.json());
const userapi = require("./Routes/users/user-Routes");
const authapi = require("./Routes/auth/auth-Routes");
const restricted = require("./Routes/auth/auth-Restriction");

server.use("/api/users", restricted, userapi);
server.use("/api/auth", authapi);

server.get("/", (req, res) => {
  res.status(200).json({ Jarvis: "Awaiting orders, Mr Stark" });
});

module.exports = server;
