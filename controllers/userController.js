const db = require("../models");
const util = require("../utils/userUtils");
const moment = require("moment-timezone");

module.exports = {
  findAll: (req, res) => {
    db.User.find({}).then((dbUser) => {
      res.json(dbUser.map(util.filterUserAccountInfo));
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findById: (req, res) => {
    const userID = req.params.id;
    db.User.findById(userID).populate("games").then((dbUser) => {
      res.json(util.filterUserAccountInfo(dbUser));
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findByUsername: (req, res) => {
    console.log("user",req.user);
    const username = req.params.username;
    db.User.findOne({ "account.username": username }).then((dbUser) => {
      res.json(util.filterUserAccountInfo(dbUser));
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  updateProfileById: (req, res) => {
    if(req.user) {
      if(String(req.user._id) === req.params.id) {
        console.log("typeof _id", typeof req.user._id);
        const userID = req.params.id;
        db.User.findOneAndUpdate({ _id: userID }, { profile: req.body }, { new: true }).then((dbUser) => {
          res.json(util.filterUserAccountInfo(dbUser));
        }).catch((err) => {
          res.status(422).json(err);
        });
      } else {
        res.status(403);
      }
    } else {
      res.status(403);
    }
  },

  getUsersGroups: (req, res) => {
    db.User.findById(req.params.id).populate("groups").then((dbUser) => {
      console.log(dbUser);
      res.json(dbUser.groups);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  getUsersEvents: (req, res) => {
    db.User.findById(req.params.id).populate("events").then((dbUser) => {
      console.log(dbUser);
      events = dbUser.events.map((event) => {
        event = event.toJSON();
        event.date = moment(event.date).format("MMMM Do YYYY, h:mm a");
        return event;
      });
      res.json(events);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  joinGroup: (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, { $addToSet: { groups: req.params.groupid } }, { new: true }).then((dbUser) => {
      res.json(dbUser);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },
  
  joinEvent: (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, { $addToSet: { events: req.params.eventid } }, { new: true }).then((dbUser) => {
      res.json(dbUser);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },
    
  addGame: (req, res) => {
    db.User.findByIdAndUpdate(req.params.id, { $addToSet: { games: req.params.gameid } }, { new: true }).then((dbUser) => {
      res.json(dbUser);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  // getGames: (req, res) => {
  //   db
  // }
}