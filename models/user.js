const { Schema, model } = require('mongoose');

const User = new Schema({
    id: String,
    username: String,
    discriminator: Number,
    password: String,
    lastConnection: Number,
    accumulatedTime: Number,
    toDo: Array,
});

module.exports = model("User", User);