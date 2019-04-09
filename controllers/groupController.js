const db = require("../models");
const util = require("../utils/userUtils");
const moment = require("moment-timezone");

module.exports = {
  findAll: (req, res) => {
    db.Group.find({}).then((dbGroup) => {
      res.json(dbGroup);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findPublic: (req, res) => {
    db.Group.find({ public: true }).then((dbGroup) => {
      res.json(dbGroup);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findById: (req, res) => {
    db.Group.findById(req.params.id).populate("events admins").then((dbGroup) => {
      dbGroup = dbGroup.toJSON();
      console.log("BEFORE\n",dbGroup);
      dbGroup.events = dbGroup.events.map((event) => {
        event.date = moment(event.date).format("MMMM Do YYYY, h:mm a");
        return event;
      });
      console.log("AFTER\n",dbGroup);
      res.json(dbGroup);
    }).catch((err) => {
      console.log(err);
      res.status(422).json(err);
    });
  },

  // TODO Add user who created it and add as admin
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

  findAdmins: (req, res) => {
    db.Group.findOne({ _id: req.params.id }).populate("admins").then((dbGroup) => {
      res.json(dbGroup.admins.map(util.filterUserAccountInfo));
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  addAdmin: (req, res) => {
    db.Group.findOneAndUpdate({ _id: req.params.id }, { $push: { admins: req.body } }, { new: true }).then((dbGroup) => {
      res.json(dbGroup.admins);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findGroupsUserAdmins: (req, res) => {
    db.Group.find({ admins: { "$in": [req.params.id] } }).then((dbGroup) => {
      res.json(dbGroup);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findGroupEvents: (req, res) => {
    db.Group.findById(req.params.id).populate("events").then((dbGroup) => {
      console.log("events",dbGroup.events);
      events = dbGroup.events.map((event) => {
        event = event.toJSON();
        event.date = moment(event.date).format("MMMM Do YYYY, h:mm a");
        return event;
      });
      res.json(events);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },
  
  // Create new event, save to group, save to user creating it
  addGroupEvent: (req, res) => {
    const id = req.params.id;
    req.body.date = new Date(req.body.date);
    let event;
    db.Event.create(req.body).then((dbEvent) => {
      event = dbEvent;
      return db.User.findByIdAndUpdate(req.body.createdBy, { $push: { events: dbEvent._id } });
    }).then(() => {
      return db.Group.findByIdAndUpdate(id, { $push: { events: event._id } });
    }).then(() => {
      res.json(event);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}