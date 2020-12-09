const mongoose = require("mongoose");
const { config } = require("../configs");

mongoose
    .connect(config.mongodb, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    })
    .then(console.log("[MongoDB] conectado ao mongo"));