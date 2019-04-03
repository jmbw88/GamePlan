const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupInviteSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const GroupInvite = mongoose.model("GroupInvite", GroupInviteSchema);

module.exports = GroupInvite;