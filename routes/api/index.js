const path = require("path");
const Router = require("express").Router();
const block = require("./block");
const event = require("./event");
const game = require("./game");
const group = require("./group");
const invite = require("./invite");
const message = require("./message");
const user = require("./user");

Router.use("/user", user);

// For anything else, render the html page
Router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = Router;