let config;

try {
    config = require('../../config.json');
} catch (error) {
    config = null;
}

exports.DISCORD = config ? config.discord.manager : process.env.D_MANAGER;
exports.GENERAL = config ? config.channels.general : process.env.GENERAL;
exports.LONG = config ? config.channels.long : process.env.LONG;
exports.SHORT = config ? config.channels.short : process.env.SHORT;