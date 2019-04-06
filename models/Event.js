const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema ({
    name: {
        type : String,
        required: true
    },
    active: {
        type: String
    },
    links: {
        type: String,
        required: true,
    },
    public: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;