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
  }
}