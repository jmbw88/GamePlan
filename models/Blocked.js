const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlockSchema = new Schema ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    blocked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blocked'
    }
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
