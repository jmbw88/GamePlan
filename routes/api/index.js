const path = require("path");
const Router = require("express").Router();
const blocks = require("./block");
const events = require("./event");
const games = require("./game");
const groups = require("./group");
const invites = require("./invite");
const messages = require("./message");
const user = require("./user");

Router.use("/user", user);
Router.use("/games", games);
Router.use("/groups", groups);
Router.use("/events", events);
Router.use("/blocks", blocks);
Router.use("/messages", messages);
Router.use("/invites", invites);

// For anything else, render the html page
Router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = Router;