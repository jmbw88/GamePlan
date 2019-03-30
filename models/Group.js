const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupSchema = new Schema ({
    description: {
        type: String,
        required: true
    },
    admin: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
    }],
    public: {
        type: Boolean,
        required: true
    },
    zip: {
        type: String,
        required: function() { return this.public === true; }
    }
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;