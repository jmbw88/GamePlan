const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    if (req.user) {
      db.Game.find({}).then((dbGame) => {
        res.json(dbGame);
      }).catch((err) => {
        res.status(422).json(err);
      });
    } else {
      res.status(403);
    }
  },

  findById: (req, res) => {
    const id = req.params.id;
    db.Game.findById(id).then((dbGame) => {
      res.json(dbGame);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  create: (req, res) => {
    db.Game.create(req.body).then((dbGame) => {
      res.json(dbGame);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}