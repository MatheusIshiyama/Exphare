const mongoose = require('mongoose');
const { config } = require('./utils/config');
const { bots } = require('./bots/index');

bots.manager.login(config.manager).then(() => {
    bots.short.login(config.shortTimer);
    bots.long.login(config.longTimer);
    bots.kraken.login(config.kraken);
    bots.grifo.login(config.grifo);
    bots.valkyrie.login(config.valkyrie);
    bots.silent.login(config.silent);
});

mongoose
    .connect(config.mongodb, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })
    .then(console.log("[MongoDB] conectado ao mongo"))