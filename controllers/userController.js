const db = require("../models");
const util = require("../utils/userUtils");

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
    db.User.findById(userID).then((dbUser) => {
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

  // add if req.user
  updateProfileById: (req, res) => {
    const userID = req.params.id;
    db.User.findOneAndUpdate({ _id: userID }, { profile: req.body }, { new: true }).then((dbUser) => {
      res.json(util.filterUserAccountInfo(dbUser));
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
    
}