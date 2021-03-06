const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;
const UserSchema = new Schema({
  account: {
    username: {
      type: String,
      unique: true,
      collation:{ locale: "en", strength: 2 }
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    lastActive: {
      type: Date,
      default: Date.now
    }
  },
  profile: {
    name: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["Male", "Female"]
    },
    zipcode: {
      type: String,
    },
    about: {
      type: String,
    },
    img: {
      type: String
    }
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: "Group"
  }],
  events: [{
    type: Schema.Types.ObjectId,
    ref: "Event"
  }],
  games: [{
    type: Schema.Types.ObjectId,
    ref: "Game"
  }]
});

UserSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.account.password);
  },
  hashPassword: (plainTextPassword) => bcrypt.hashSync(plainTextPassword, 10)
}

// May need to redo if we are going to offer other forms of auth through facebook or google
UserSchema.pre("save", function(next) {
  if (!this.account.password) {
    console.log("models/user.js NO PASSWORD PROVIDED");
    next();
  } else {
    console.log("models/user.js hashPassword in pre save");
    this.account.password = this.hashPassword(this.account.password);
    next();
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

