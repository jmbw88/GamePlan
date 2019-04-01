const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Group.find({}).then((dbGroup) => {
      res.json(dbGroup);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findById: (req, res) => {
    db.Group.findById(req.params.id).then((dbGroup) => {
      res.json(dbGroup);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  create: (req, res) => {
    db.Group.create(req.body).then((dbGroup) => {
      res.json(dbGroup);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  // TODO add auth for user and check if admin of group
  update: (req, res) => {
    db.Group.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }).then((dbGroup) => {
      res.json(dbGroup);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  getAdmins: (req, res) => {
    db.Group.findOne({ _id: req.params.id }).then((dbGroup) => {
      res.json(dbGroup.admins);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}