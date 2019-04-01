const Router = require("express").Router();
const accountController = require("../controllers/accountController");
const passport = require("../passport");

Router.route("/")
  .post(accountController.createUser)
  .get(accountController.getCurrentUser);

Router.route("/login")
  .post(accountController.attemptLogin, passport.authenticate("local"), accountController.completeLogin);
  
Router.route("/logout").post(accountController.logout);


module.exports = Router;