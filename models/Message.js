const mongoose = require("mongoose");
const { Schema } = mongoose;

const MsgSchema = new Schema ({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false,
        required: true
    }
});

const Message = mongoose.model("Message", MsgSchema);

module.exports = Message;
