let config;
try {
    config = require('../../../config.json');
} catch (error) {
    config = null;
}

exports.DISCORD = config ? config.discord.short : process.env.D_SHORT;