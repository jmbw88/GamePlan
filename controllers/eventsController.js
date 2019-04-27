const db = require("../models");
const moment = require("moment-timezone");

module.exports = {
  findAll: (req, res) => {
    db.Event.find({}).then((dbEvent) => {
      dbEvent = dbEvent.map((event) => {
        event = event.toJSON();
        event.date = moment(event.date).format("MMMM Do YYYY, h:mm a");
        return event;
      });
      res.json(dbEvent);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findById: (req, res) => {
    db.Event.findById(req.params.id).populate("createdBy").then((dbEvent) => {
      dbEvent = dbEvent.toJSON();
      dbEvent.date = moment(dbEvent.date).format("MMMM Do YYYY, h:mm a");
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
    if (req.user) {
      req.body.date = new Date(req.body.date);
      let event;
      db.Event.create(req.body).then((dbEvent) => {
        event = dbEvent;
        return db.User.findByIdAndUpdate(req.body.createdBy, { $addToSet: { events: dbEvent._id } }, { new: true });
      }).then(() => {
        res.json(event);
      })
      .catch((err) => {
        res.status(422).json(err);
      });
    } else {
      res.status(403);
    }
  }
}