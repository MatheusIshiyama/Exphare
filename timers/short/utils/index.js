let config;
try {
    config = require('../../../config.json');
} catch (error) {
    config = null;
}

exports.GUILD = config ? config.guild : process.env.GUILD;
exports.ID = config ? config.id.short : process.env.SHORT_ID;
exports.DISCORD = config ? config.discord.short : process.env.D_SHORT;
exports.CHANNEL = config ? config.channels.short : process.env.SHORT;
exports.STATUS = config ? config.channels.shortStatus : process.env.SHORT_STATUS;
exports.ROLE = config ? config.roles.short : process.env.SHORT_ROLE;