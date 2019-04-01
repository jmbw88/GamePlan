const path = require("path");
const Router = require("express").Router();
const API = require("./api");
const account = require("./account");

Router.use("/api", API);
Router.use("/account", account);

// If no API routes are hit, send the React app
Router.use((req, res) =>
  res.sendFile(path.join(__dirname, "../client/build/index.html"))
);

module.exports = Router;