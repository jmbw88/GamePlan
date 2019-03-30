const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../models/User");

// Called on login, saves id to session req.session.passport.user
passport.serializeUser((user, done) => {
  console.log(`serializeUser called on ${user}`);
  done(null, { _id: user._id });
});

passport.deserializeUser((id, done) => {
  console.log("deserializeUser called");
  User.findOne({ _id: id }, "username", (err, user) => {
    console.log(`deserializng user ${user}`);
    done(null, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;

