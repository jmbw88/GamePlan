const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventInviteSchema = new Schema ({
    Users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    EventID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    },
});

const EventInvite = mongoose.model("EventInvite", EventInviteSchema);

module.exports = EventInvite;