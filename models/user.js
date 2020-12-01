const { Schema, model } = require('mongoose');

const User = new Schema({
    id: String,
    name: String,
    voiceTime: Number,
    accumulatedTime: Number,
    toDo: Array,
});

module.exports = model("User", User);