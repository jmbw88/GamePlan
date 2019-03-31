const Router = require("express").Router();
const msgController = require("../controllers/msgController");

Router.route("/")
  .get(msgController.getAllMessages)

Router.route("/:userid")
  .get(msgController.getThread)
  .delete(msgController.deleteMessage)
  .post(msgController.sendMessage)

module.exports = Router