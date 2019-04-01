const Router = require("express").Router();
const gamesController = require("../../controllers/gamesController");

Router.route("/")
    .get(gamesController.findAll)
    .post(gamesController.create);

Router.route("/:id")
    .get(gamesController.findById);

module.exports = Router;