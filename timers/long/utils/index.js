let config;
try {
    config = require('../../../config.json');
} catch (error) {
    config = null;
}

exports.GUILD = config ? config.guild : process.env.GUILD;
exports.ID = config ? config.id.long : process.env.LONG_ID;
exports.DISCORD = config ? config.discord.long : process.env.D_LONG;
exports.CHANNEL = config ? config.channels.long : process.env.LONG;
exports.STATUS = config ? config.channels.longStatus : process.env.LONG_STATUS;
exports.ROLE = config ? config.roles.long : process.env.LONG_ROLE;