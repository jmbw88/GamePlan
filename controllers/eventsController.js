const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Event.find({}).then((dbEvent) => {
      res.json(dbEvent);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findById: (req, res) => {
    db.Event.findById(req.params.id).then((dbEvent) => {
      res.json(dbEvent);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findPublic: (req, res) => {
    db.Event.find({ public: true }).then((dbEvent) => {
      res.json(dbEvent);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  // TODO UPDATE THIS FOR DATE
  create: (req, res) => {
    db.Event.create(req.body).then((dbEvent) => {
      res.json(dbEvent);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}