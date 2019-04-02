const mongoose = require("mongoose");
const { Schema } = mongoose;

const MsgSchema = new Schema ({
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Receiver",
        required: true
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sender",
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
