let config;

try {
    config = require('../config.json');
} catch (error) {
    config = null;
}

exports.DISCORD = config ? config.discord : process.env.DISCORD;
exports.GENERAL = config ? config.general : process.env.GENERAL;
exports.SHORT = config ? config.shortTimer : process.env.SHORT;
exports.LONG = config ? config.longTimer : process.env.LONG;