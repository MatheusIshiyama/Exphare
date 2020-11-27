let config;
try {
    config = require('../../../config.json');
} catch (error) {
    config = null;
}

exports.DISCORD = config ? config.discord.kraken : process.env.D_KRAKEN;