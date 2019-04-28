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
    if(req.user) {
      const userID = req.params.id;
      db.User.findById(userID).populate("games events groups").then((dbUser) => {
        res.json(util.filterUserAccountInfo(dbUser));
      }).catch((err) => {
        res.status(422).json(err);
      });
    } else {
      res.status(403);
    }
  },

  findByUsername: (req, res) => {
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
    if (req.user) {
      db.User.findById(req.params.id).populate("groups").then((dbUser) => {
        res.json(dbUser.groups);
      }).catch((err) => {
        res.status(422).json(err);
      });
    } else {
      res.status(403);
    }
  },

  getUsersEvents: (req, res) => {
    if (req.user) {
      db.User.findById(req.params.id).populate("events").then((dbUser) => {
        res.json(dbUser.events);
      }).catch((err) => {
        res.status(422).json(err);
      });
    } else {
      res.status(403);
    }
  },

  joinGroup: (req, res) => {
    if (req.user) {
      db.User.findByIdAndUpdate(req.params.id, { $addToSet: { groups: req.params.groupid } }, { new: true }).then((dbUser) => {
        res.json(dbUser);
      }).catch((err) => {
        res.status(422).json(err);
      });
    } else {
      res.status(403);
    }
  },
  
  joinEvent: (req, res) => {
    if (req.user) {
      db.User.findByIdAndUpdate(req.params.id, { $addToSet: { events: req.params.eventid } }, { new: true }).then((dbUser) => {
        res.json(dbUser);
      }).catch((err) => {
        res.status(422).json(err);
      });
    } else {
      res.status(403);
    }
  },
    
  addGame: (req, res) => {
    if (req.user) {
      db.User.findByIdAndUpdate(req.params.id, { $addToSet: { games: req.params.gameid } }, { new: true }).then((dbUser) => {
        res.json(dbUser);
      }).catch((err) => {
        res.status(422).json(err);
      });
    } else {
      res.status(403);
    }
  },

  getUsersByGame: (req, res) => {
    db.User.find({ games: req.params.id }).then((dbUser) => {
      res.json(dbUser);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}