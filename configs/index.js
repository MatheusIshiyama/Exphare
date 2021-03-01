let config;
try {
    config = require("../config.json");
} catch (error) {
    config = null;
}

exports.config = {
    mongodb: process.env.MONGO_DB,
    manager: process.env.MANAGER_TOKEN,
    silent: process.env.SILENT_TOKEN,
    longTimer: process.env.LONG_TOKEN,
    shortTimer: process.env.SHORT_TOKEN,
    kraken: process.env.KRAKEN_TOKEN,
    grifo: process.env.GRIFO_TOKEN,
    valkyrie: process.env.VALKYRIE_TOKEN,
};
