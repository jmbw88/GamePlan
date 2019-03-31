const db = require("../models");

module.exports = {
  findAll: (req, res) => {
    db.User.find({}).then((dbUser) => {
      dbUser = dbUser.map((user) => {
        user.account = { 
          username: user.account.username, 
          createdAt: user.account.createdAt, 
          lastActive: user.account.lastActive 
        };
        return user;
      });
      res.json(dbUser);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findById: (req, res) => {
    const userID = req.params.id;
    db.User.findById(userID).then((dbUser) => {
      dbUser.account = {
        username: dbUser.account.username, 
        createdAt: dbUser.account.createdAt, 
        lastActive: dbUser.account.lastActive 
      };
      res.json(dbUser);
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  getProfile: (req, res) => {

  },

  updateProfile: (req, res) => {

  },


}