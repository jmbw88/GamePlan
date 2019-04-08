const db = require("../models");
const momentTZ = require("moment-timezone");

module.exports = {
  findAll: (req, res) => {
    db.Event.find({}).then((dbEvent) => {
      res.json(dbEvent);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findById: (req, res) => {
    db.Event.findById(req.params.id).populate("createdBy").then((dbEvent) => {
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

  create: (req, res) => {
    req.body.date = new Date(req.body.date);
    let event;
    db.Event.create(req.body).then((dbEvent) => {
      event = dbEvent;
      return db.User.findByIdAndUpdate(req.body.createdBy, { $push: { events: dbEvent._id } }, { new: true });
    }).then(() => {
      res.json(event);
    })
    .catch((err) => {
      res.status(422).json(err);
    });
  }
}