const db = require("../models");
const util = require("../utils/userUtils");

module.exports = {
  findAll: (req, res) => {
    db.Blocked.find({}).populate("user").populate("blocked").then((dbBlocked) => {
      res.json(dbBlocked);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  getBlockedUsers: (req, res) => {
    db.Blocked.find({ user: req.params.id }).populate("blocked").then((dbBlocked) => {
      res.json(dbBlocked);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  getBlockedUser: (req, res) => {
    db.Blocked.find({ user: req.params.id, blocked: req.params.blocked }).populate("blocked").then((dbBlocked) => {
      res.json(dbBlocked);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  create: (req, res) => {
    db.Blocked.create(req.body).then((dbBlocked) => {
      res.json(dbBlocked);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  unblock: (req, res) => {
    db.Blocked.findOneAndDelete({ users: req.params.id, blocked: req.params.blocked }).then((dbBlocked) => {
      res.json(dbBlocked);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}