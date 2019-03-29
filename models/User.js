const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { Schema } = mongoose;

const UserSchema = new Schema({
  account: {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
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
  Profile: {
    name: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      enum: ["Male", "Female"]
    },
    zipcode: {
      type: String,
      required: true
    },
    about: {
      type: String,
    }
  },
  groups: [{
    type: Schema.Types.ObjectId,
    ref: "Group"
  }],
  events: [{
    type: Schema.Types.ObjectId,
    ref: "Event"
  }]
});


const User = mongoose.model("User", UserSchema);

module.exports = User;
