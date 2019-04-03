const Router = require("express").Router();
const msgController = require("../../controllers/msgController");

Router.route("/")
    .get(msgController.findAll)
    .post(msgController.sendMsg);

Router.route("/:userid/:otherid")
    .get(msgController.findThread);

Router.route("/:id")
    .get(msgController.findContacts);
// Router.route("/:userid")
//   .get(msgController.getThread)
//   .delete(msgController.deleteMessage)
//   .post(msgController.sendMessage);

module.exports = Router;