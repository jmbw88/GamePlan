const mongoose = require("mongoose");
const { Schema } = mongoose;

const InviteSchema = new Schema ({
    Users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    GroupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    EventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }
});

const Invite = mongoose.model("Invite", InviteSchema);

module.exports = Invite;