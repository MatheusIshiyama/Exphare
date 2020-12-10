const { Schema, model } = require('mongoose');

const User = new Schema({
    id: String,
    name: String,
    username: String,
    password: String,
    lastConnection: Number,
    accumulatedTime: Number,
    tasks: Array,
});

module.exports = model("User", User);