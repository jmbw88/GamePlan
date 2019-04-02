const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Message.find({}).then((dbMsg) => {
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },
  findThread: (req, res) => {},
  sendMsg: (req, res) => {
    db.Message.create(req.body).then((dbMsg) => {
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}