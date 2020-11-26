let config;
try {
    config = require('../../../config.json');
} catch (error) {
    config = null;
}

exports.DISCORD = config ? config.timers.short.discord : process.env.D_SHORT;