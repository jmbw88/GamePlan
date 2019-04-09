const db = require("../models");
const moment = require("moment-timezone");

module.exports = {
  findAll: (req, res) => {
    db.Message.find({}).populate("to").populate("from").then((dbMsg) => {
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  // Find all messages user has sent/received for a particular user
  // TODO If user clicks thread, mark all messages with to: userid to read
  findThread: (req, res) => {
    const userid = req.params.userid;
    const otherid = req.params.otherid;
    db.Message.find({ $or: [{ to: userid, from: otherid }, { to: otherid, from: userid }] }).sort("createdAt").then((dbMsg) => {
      dbMsg = dbMsg.map((msg) => {
        msg = msg.toJSON();
        msg.createdAt = moment(msg.createdAt).calendar();
        console.log(msg);
        return msg;
      });
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  // Return username and id for all users that this user has sent a message to or received a message from
  // TODO if contact has unread messages by user, send that info to the client
  findContacts: (req, res) => {
    const id = req.params.id;
    // Find all messages that user has sent or received
    db.Message.find({ $or: [{ to: id }, { from: id }] }).select("to from -_id").populate("to from").then((dbMsg) => {
      // Return other user involved with message whether they are the sender or recipient
      const users = dbMsg.map((msg) => {
        if (String(msg.to._id) === id) {
          return {username: msg.from.account.username, id: msg.from._id};
        } else {
          return {username: msg.to.account.username, id: msg.to._id};
        }
        // Remove duplicate users from array
      }).reduce((unique, o) => {
        if(!unique.some(obj => obj.username === o.username)) {
          unique.push(o);
        }
        return unique
      }, []);
      res.json(users);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  sendMsg: (req, res) => {
    console.log(req.body);
    db.Message.create(req.body).then((dbMsg) => {
      dbMsg = dbMsg.toJSON();
      dbMsg.createdAt = moment(dbMsg.createdAt).calendar();
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}

// get messages to me search for any read messages and send back boolean with user id and displaying on page