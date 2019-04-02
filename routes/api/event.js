const Router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

Router.route("/")
    .get(eventsController.findAll)
    .post(eventsController.create);

Router.route("/public")
    .get(eventsController.findPublic);
    
Router.route("/:id")
    .get(eventsController.findById);

module.exports = Router;