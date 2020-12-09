const mongoose = require("mongoose");
const { config } = require("../config");

mongoose
    .connect(config.mongodb, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(console.log("[MongoDB] conectado ao mongo"));