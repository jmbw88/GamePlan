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
    }
})

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;