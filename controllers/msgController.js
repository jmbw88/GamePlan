const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.Message.find({}).populate("to").populate("from").then((dbMsg) => {
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },
  findThread: (req, res) => {
    const userid = req.params.userid;
    const otherid = req.params.otherid;
    db.Message.find({ $or: [{ to: userid, from: otherid }, { to: otherid, from: userid }] }).sort("createdAt").then((dbMsg) => {
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },
  sendMsg: (req, res) => {
    db.Message.create(req.body).then((dbMsg) => {
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}