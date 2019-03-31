const Router = require("express").Router();
const userController = require("../../controllers/userController");
// const passport = require("../passport");

Router.route("/")
    .get(userController.findAll);

Router.route("/:id")
    .get(userController.findById);

Router.route("/profile")
    .put(userController.updateProfile)
    .get(userController.getProfile);

// Router.route("/profile/:id")
//   .get(userController.getProfile);

// Router.route("/:id")
//   .get(userController.getID)

// Router.route("/username/:username")
//   .get(userController.getUser)

// Router.route("/invite/groups/:groupid")
//   .put(userController.acceptGroup)

// Router.route("/invite/events/:eventid")
//   .put(userController.acceptEvent)
  
module.exports = Router;