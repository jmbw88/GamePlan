const Router = require("express").Router();
const groupController = require("../../controllers/groupController");

Router.route("/")
    .get(groupController.findAll)
    .post(groupController.create);

// Router.route("/users/:groupid")
//     .get(groupController.findThisGroup);

// Router.route("/:groupid")
//     .get(groupController.findOneGroup);

// Router.route("/admin/:groupid")
//     .put(groupController.groupProfile);

module.exports = Router;