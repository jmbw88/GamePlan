const mongoose = require("mongoose");
const { Schema } = mongoose;

const EventSchema = new Schema ({
    title: {
        type : String,
        required: true
    },
    description: {
        type: String
    },
    zipcode: {
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