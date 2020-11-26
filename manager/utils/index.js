let config;

try {
    config = require('../../config.json');
} catch (error) {
    config = null;
}

exports.DISCORD = config ? config.manager.discord : process.env.D_MANAGER;
exports.GENERAL = config ? config.manager.general : process.env.GENERAL;
exports.SHORT = config ? config.manager.shortTimer : process.env.SHORT;
exports.LONG = config ? config.manager.longTimer : process.env.LONG;