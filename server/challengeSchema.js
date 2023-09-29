const mongoose = require("mongoose");

const challengeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    current: { type: Number, default: 0 }
});

const Challenge = mongoose.model("challenge", challengeSchema);

module.exports = { Challenge };