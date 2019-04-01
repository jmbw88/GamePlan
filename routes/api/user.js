const Router = require("express").Router();
const userController = require("../../controllers/userController");
// const passport = require("../passport");

Router.route("/")
    .get(userController.findAll);

Router.route("/:id")
    .get(userController.findById);

Router.route("/username/:username")
    .get(userController.findByUsername);

Router.route("/profile/:id")
    .put(userController.updateProfileById);

// Router.route("/invite/groups/:groupid")
//   .put(userController.acceptGroup)

// Router.route("/invite/events/:eventid")
//   .put(userController.acceptEvent)
  
module.exports = Router;