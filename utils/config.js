let config;
try {
    config = require('../config.json');
} catch (error) {
    config = null;
}

exports.config = {
    mongodb: config ? config.mongodb : process.env.MONGO_DB,
    manager: {
        token: config ? config.bots.manager : process.env.MANAGER_TOKEN
    },
    silent: {
        token: config ? config.bots.silent : process.env.SILENT_TOKEN
    },
    longTimer: {
        token: config ? config.bots.long : process.env.LONG_TOKEN
    },
    shortTimer: {
        token: config ? config.bots.short : process.env.SHORT_TOKEN
    },
    kraken: {
        token: config ? config.bots.kraken : process.env.KRAKEN_TOKEN
    },
    grifo: {
        token: config ? config.bots.grifo : process.env.GRIFO_TOKEN
    },
    valkyrie: {
        token: config ? config.bots.valkyrie : process.env.VALKYRIE_TOKEN
    }
}