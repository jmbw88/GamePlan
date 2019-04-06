const mongoose = require("mongoose");
const { Schema } = mongoose;

const DesignerSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    designerSince: {
        type: Number
    },
    links: {
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        boardgamegeek: {
            type: String
        },
        length: {
            type: String
        }
    },

});

const Designer = mongoose.model("Designer", DesignerSchema);
module.exports = Designer;