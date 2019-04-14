const Router = require("express").Router();
const msgController = require("../../controllers/msgController");

Router.route("/")
    .get(msgController.findAll)
    .post(msgController.sendMsg);

Router.route("/:userid/:otherid")
    .get(msgController.findThread);

Router.route("/newest/:userid/:otherid/")
    .get(msgController.findNewest);

Router.route("/:id")
    .get(msgController.findContacts);


module.exports = Router;