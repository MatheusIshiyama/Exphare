let config;
try {
    config = require('../config.json');
} catch (error) {
    config = null;
}

exports.config = {
    server: config ? config.server : process.env.SERVER,
    manager: {
        token: config ? config.bots.manager : process.env.MANAGER_TOKEN
    },
    longTimer: {
        id: config ? config.id.long : process.env.LONG_ID,
        token: config ? config.bots.long : process.env.LONG_TOKEN,
        role: config ? config.roles.long : process.env.LONG_ROLE
    },
    shortTimer: {
        id: config ? config.id.short : process.env.SHORT_ID,
        token: config ? config.bots.short : process.env.SHORT_TOKEN,
        role: config ? config.roles.short : process.env.SHORT_ROLE
    },
    kraken: {
        token: config ? config.bots.kraken : process.env.KRAKEN_TOKEN
    },
    grifo: {
        token: config ? config.bots.grifo : process.env.GRIFO_TOKEN
    },
    valkyrie: {
        token: config ? config.bots.valkyrie : process.env.VALKYRIE_TOKEN
    },
    channels: {
        general: config ? config.channels.generalText : process.env.GENERAL_TEXT,
        longTimer: {
            text: config ? config.channels.longText : process.env.LONG_TEXT,
            voice: config ? config.channels.longVoice : process.env.LONG_VOICE
        },
        shortTimer: {
            text: config ? config.channels.shortText : process.env.SHORT_TEXT,
            voice: config ? config.channels.shortVoice : process.env.SHORT_VOICE
        }
    },
    notify: {
        study: config ? config.notify.study : process.env.NOTIFY_STUDY,
        pause: config ? config.notify.pause : process.env.NOTIFY_PAUSE
    }
}