const Router = require("express").Router();
const userController = require("../../controllers/userController");

Router.route("/")
    .get(userController.findAll);

Router.route("/:id")
    .get(userController.findById);

Router.route("/username/:username")
    .get(userController.findByUsername);

Router.route("/profile/:id")
    .put(userController.updateProfileById);

Router.route("/:id/groups")
    .get(userController.getUsersGroups);

Router.route("/:id/events")
    .get(userController.getUsersEvents);

Router.route("/:id/groups/:groupid")
    .put(userController.joinGroup);

Router.route("/:id/events/:eventid")
    .put(userController.joinEvent);

Router.route("/games/:id")
    .get(userController.getUsersByGame)

Router.route("/:id/games/:gameid")
    .put(userController.addGame);

  
module.exports = Router;