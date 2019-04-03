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
});

const EventInvite = mongoose.model("EventInvite", EventInviteSchema);

module.exports = EventInvite;