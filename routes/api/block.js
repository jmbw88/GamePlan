const Router = require("express").Router();
const blockController = require("../../controllers/blockController");

Router.route("/")
    .get(blockController.findAll)
    .post(blockController.create);
    
Router.route("/user/:id")
    .get(blockController.getBlockedUsers);

Router.route("/user/:id/:blocked")
    .get(blockController.getBlockedUser)
    .delete(blockController.unblock);
    // .post(blockController.create);



module.exports = Router;