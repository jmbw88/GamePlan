const Router = require("express").Router();
const groupController = require("../../controllers/groupController");

Router.route("/")
    .get(groupController.findAll)
    .post(groupController.create);

Router.route("/public")
    .get(groupController.findPublic);

Router.route("/:id")
    .get(groupController.findById)
    .put(groupController.update);

Router.route("/:id/admins")
    .get(groupController.findAdmins)
    .put(groupController.addAdmin);

Router.route("/admins/:id")
    .get(groupController.findGroupsUserAdmins);

Router.route("/:id/events/")
    .get(groupController.findGroupEvents);

Router.route("/:groupId/events/:eventId")
    .put(groupController.addGroupEvent); // TODO


module.exports = Router;