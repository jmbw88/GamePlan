const Router = require("express").Router();
const userController = require("../controllers/userController");
const passport = require("../passport");

Router.route("/")
  .post(userController.createUser)
  .get(userController.getCurrentUser);

Router.route("/login")
  .post(userController.attemptLogin, passport.authenticate("local"), userController.completeLogin);
  
Router.route("/logout").post(userController.logout);

module.exports = Router;