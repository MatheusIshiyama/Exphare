let config;

try {
    config = require('../config.json');
} catch (error) {
    config = null;
}

exports.DISCORD = config ? config.discord : process.env.DISCORD