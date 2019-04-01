const path = require("path");
const Router = require("express").Router();
const block = require("./block");
const event = require("./event");
const games = require("./game");
const groups = require("./group");
const invite = require("./invite");
const message = require("./message");
const user = require("./user");

Router.use("/user", user);
Router.use("/games", games);
Router.use("/groups", groups);

// For anything else, render the html page
Router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = Router;