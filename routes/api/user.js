const Router = require("express").Router();
const userController = require("../../controllers/userController");
// const passport = require("../passport");

// Router.route("/")
//   .post(userController.createUser)
//   .get(userController.getCurrentUser);

// Router.route("/login")
//   .post(userController.attemptLogin, passport.authenticate("local"), userController.completeLogin);
  
// Router.route("/logout").post(userController.logout);

// Router.route("/profile")
//   .post(userController.updateProfile)
//   .get(userController.getProfile);

// Router.route("/profile/:id")
//   .get(userController.getProfile)

// Router.route("/:id")
//   .get(userController.getID)

// Router.route("/username/:username")
//   .get(userController.getUser)

// Router.route("/invite/groups/:groupid")
//   .put(userController.acceptGroup)

// Router.route("/invite/events/:eventid")
//   .put(userController.acceptEvent)
  
module.exports = Router;