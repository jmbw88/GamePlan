const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

const Stategy = new LocalStrategy(
  {
    usernameField: "username"
  },
  function(username, password, done) {
    User.findOne({ account: { username: username } }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username/password"});
      }
      if (!user.checkPassword(password)) {
        return done(null, false, { message: "Incorrect username/password"});
      }
      return done(null, user);
    });
  }
);

module.exports = Stategy;