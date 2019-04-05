const mongoose = require("mongoose");
const { Schema } = mongoose;

const GameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
            difficulty: {
                type: String,
                enum: ["Beginner", "Experienced", "Challenging"]
            },
            uniqueness: {
                type: String,
                enum: ["Standard", "Unique", "Very Unique"]
            },
            cooperative: {
                type: Boolean
            },
            length: {
                type: String,
                enum: ["15min-1hr", "1hr-2hr", "4+ hrs"]
            }
        },
    img: {
        type: String
    }
});

const Game = mongoose.model("Game", GameSchema);

module.exports = Game;