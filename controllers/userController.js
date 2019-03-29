const db = require("../models");

module.exports = {
  createUser: (req, res) => {
    const { email, username, password } = req.body;
    console.log(req.body);
    db.User.findOne({ account: { username: username } }, (err, user) => {
      if (err) {
        console.log("User.js POST ERROR: ", err);
      }
      else if (user) {
        res.json({
          error: "A user already exists with that username/email"
        });
      }
      else {
        const newUser = new db.User(
          {account : {
            email: email,
            username: username,
            password: password
          }}
          );
        console.log(newUser);
        newUser.save((err, savedUser) => {
          if (err) {
            console.log(err);
            return res.json(err);
          } 
          res.json(savedUser);
        });
      }
    });
  },

  attemptLogin: (req, res, next) => {
    next();
  },

  completeLogin: (req, res) => {
    res.send({ username: req.user.username });
  },

  getCurrentUser: (req, res, next) => {
    if (req.user) {
      res.json({ user: req.user });
    }
    else {
      res.json({ user: null });
    }
  },

  logout: (req, res) => {
    if (req.user) {
      req.logout();
      res.send({ msg: "Logging out" });
    }
    else {
      res.send({ msg: "No user to log out" });
    }
  }
}
