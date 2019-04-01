const Router = require("express").Router();
const groupController = require("../../controllers/groupController");

Router.route("/")
    .get(groupController.findAll)
    .post(groupController.create);

Router.route("/:id")
    .get(groupController.findById)
    .put(groupController.update);

Router.route("/:id/admins")
    .get(groupController.getAdmins)
    .put(groupController.addAdmin);

// Router.route("/users/:groupid")
//     .get(groupController.findThisGroup);

// Router.route("/:groupid")
//     .get(groupController.findOneGroup);

// Router.route("/admin/:groupid")
//     .put(groupController.groupProfile);

module.exports = Router;