const mongoose = require("mongoose");
const { Schema } = mongoogse;

const EventSchema = new Schema ({
    title: {
        type : String,
        required: true
    },
    zip : {
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
    }
})

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;