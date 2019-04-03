const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventInviteSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const EventInvite = mongoose.model("EventInvite", EventInviteSchema);

module.exports = EventInvite;