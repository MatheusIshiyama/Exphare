let config;
try {
    config = require("../config.json");
} catch (error) {
    config = null;
}

exports.config = {
    mongodb: config ? config.mongodb : process.env.MONGO_DB,
    manager: config ? config.bots.manager : process.env.MANAGER_TOKEN,
    silent: config ? config.bots.silent : process.env.SILENT_TOKEN,
    longTimer: config ? config.bots.long : process.env.LONG_TOKEN,
    shortTimer: config ? config.bots.short : process.env.SHORT_TOKEN,
    kraken: config ? config.bots.kraken : process.env.KRAKEN_TOKEN,
    grifo: config ? config.bots.grifo : process.env.GRIFO_TOKEN,
    valkyrie: config ? config.bots.valkyrie : process.env.VALKYRIE_TOKEN,
};
