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

  findContacts: (req, res) => {
    const id = req.params.id;
    db.Message.find({ $or: [{ to: id }, { from: id }] }).select("to from -_id").populate("to from").then((dbMsg) => {
      const users = dbMsg.map((msg) => {
        if (String(msg.to._id) === id) {
          return {username: msg.from.account.username, id: msg.from._id};
        } else {
          return {username: msg.to.account.username, id: msg.to._id};
        }
      });
      res.json([...new Set(users)]);
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