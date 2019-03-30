const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema ({
    Auth : [
        Username, {
            type: String,
            required: true
        },
        Password, {
            type: String,
            required: true
        },
        createdAt, {
            type: Date,
            required: true
        }
    ], 

    Profile: [
        Name, {
            type: String,
            required: true
        },
        Sex, {
            type: String
        },
        Zip, {
            type: String
        },
        About, {
            type: String
        }
    ],
    Groups: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    Events: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    login: {
        type: Date,
        required: true
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = User;