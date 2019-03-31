const db = require("../models");

filterUserAccountInfo = (user) => {
  user.account = { 
    username: user.account.username, 
    createdAt: user.account.createdAt, 
    lastActive: user.account.lastActive 
  };
  return user;
}

module.exports = {
  findAll: (req, res) => {
    db.User.find({}).then((dbUser) => {
      res.json(dbUser.map(filterUserAccountInfo));
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findById: (req, res) => {
    const userID = req.params.id;
    db.User.findById(userID).then((dbUser) => {
      res.json(filterUserAccountInfo(dbUser));
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  findByUsername: (req, res) => {
    const username = req.params.username;
    db.User.findOne({ "account.username": username }).then((dbUser) => {
      res.json(filterUserAccountInfo(dbUser));
    }).catch((err) => {
      res.status(422).json(err);
    });
  },

  // localhost:3000/api/user/profile/5c9e90c73fc5f80a6cb13c34
  // {
  //   "profile": {
  //     "name": "Dylan Thomson",
  //     "sex": "Male",
  //     "zipcode": "44060",
  //     "about": "Casual board game player."
  //   }	  
  // }
  updateProfileById: (req, res) => {
    const userID = req.params.id;
    console.log(userID);
    console.log(req.body);
    db.User.findOneAndUpdate({ _id: userID }, { profile: req.body }, { new: true }).then((dbUser) => {
      res.json(filterUserAccountInfo(dbUser));
    }).catch((err) => {
      res.status(422).json(err);
    });
  },


}