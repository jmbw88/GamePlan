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
  findThread: (req, res) => {
    const userid = req.params.userid;
    const otherid = req.params.otherid;
    db.Message.updateMany({ to: userid, from: otherid }, { $set: { read: true }}).then(() => {
      db.Message.find({ $or: [{ to: userid, from: otherid }, { to: otherid, from: userid }] }).sort("createdAt").then((dbMsg) => {
        dbMsg = dbMsg.map((msg) => {
          msg = msg.toJSON();
          msg.createdAt = moment(msg.createdAt).calendar();
          return msg;
        });
        res.json(dbMsg);
      }).catch((err) => {
        res.status(422).json(err);
      });
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findNewest: (req, res) => {
    const userid = req.params.userid;
    const otherid = req.params.otherid
    db.Message.findOne({ $or: [{ to: userid, from: otherid }, { to: otherid, from: userid }] }).sort({ createdAt: -1 }).then((dbMsg) => {
      dbMsg = dbMsg.toJSON();
      dbMsg.createdAt = moment(dbMsg.createdAt).calendar();
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  // Return username and id for all users that this user has sent a message to or received a message from
  findContacts: (req, res) => {
    const id = req.params.id;
    // Find all messages that user has sent or received
    db.Message.find({ $or: [{ to: id }, { from: id }] }).select("to read from -_id").populate("to from").then((dbMsg) => {
      const unread = dbMsg.filter((msg) => !msg.read && String(msg.to._id) === id);
      console.log("UNREAD: ", unread);

      // Return other user involved with message whether they are the sender or recipient
      const users = dbMsg.map((msg) => {
        if (String(msg.to._id) === id) {
          return {username: msg.from.account.username, id: msg.from._id, img: msg.from.profile.img};
        } else {
          return {username: msg.to.account.username, id: msg.to._id, img: msg.to.profile.img};
        }
        // Remove duplicate users from array
      }).reduce((unique, o) => {
        if(!unique.some(obj => obj.username === o.username)) {
          unique.push(o);
        }
        return unique
      }, []).map((user) => {
        let unreadCount = 0;
        console.log("USER", user);
        console.log("UNREAD", unread);
        unread.forEach((msg) => {
          console.log("FROM ID, USER", msg.from._id, id);
          if (String(msg.from._id) === String(user.id)) unreadCount++;
        });
        user.unreadCount = unreadCount;
        return user;
      });

      console.log(users);
      res.json(users);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  sendMsg: (req, res) => {
    db.Message.create(req.body).then((dbMsg) => {
      dbMsg = dbMsg.toJSON();
      dbMsg.createdAt = moment(dbMsg.createdAt).calendar();
      res.json(dbMsg);
    }).catch((err) => {
      res.status(422).json(err);
    });
  }
}