const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupInviteSchema = new Schema ({
    Users: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    GroupID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    },
});

const GroupInvite = mongoose.model("GroupInvite", GroupInviteSchema);

module.exports = GroupInvite;