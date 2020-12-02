let config;
try {
    config = require('../config.json');
} catch (error) {
    config = null;
}

exports.config = {
    server: config ? config.server : process.env.SERVER,
    mongodb: config ? config.mongodb : process.env.MONGO_DB,
    confirm: config ? config.confirm : process.env.CONFIRM,
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
        id: config ? config.id.kraken : process.env.KRAKEN_ID,
        token: config ? config.bots.kraken : process.env.KRAKEN_TOKEN
    },
    grifo: {
        id: config ? config.id.grifo : process.env.GRIFO_ID,
        token: config ? config.bots.grifo : process.env.GRIFO_TOKEN
    },
    valkyrie: {
        id: config ? config.id.valkyrie : process.env.VALKYRIE_ID,
        token: config ? config.bots.valkyrie : process.env.VALKYRIE_TOKEN
    },
    channels: {
        general: config ? config.channels.generalVoice : process.env.GENERAL_VOICE,
        longTimer: {
            text: config ? config.channels.longText : process.env.LONG_TEXT,
            voice: config ? config.channels.longVoice : process.env.LONG_VOICE
        },
        shortTimer: {
            text: config ? config.channels.shortText : process.env.SHORT_TEXT,
            voice: config ? config.channels.shortVoice : process.env.SHORT_VOICE
        },
        logs: config ? config.channels.logsText : process.env.LOGS_TEXT,
        toDo: config ? config.channels.toDoText : process.env.TODO_TEXT,
        add: config ? config.channels.addText : process.env.ADD_TEXT,
        remove: config ? config.channels.removeText : process.env.REMOVE_TEXT,
    },
    rolesIds: {
        oraculo: config ? config.rolesId.oraculo : process.env.ROLE_ORACULO,
        mestre: config ? config.rolesId.mestre : process.env.ROLE_MESTRE,
        senior: config ? config.rolesId.senior : process.env.ROLE_SENIOR,
        veterano: config ? config.rolesId.veterano : process.env.ROLE_VETERANO,
        experiente: config ? config.rolesId.experiente : process.env.ROLE_EXPERIENTE,
        proficiente: config ? config.rolesId.proficiente : process.env.ROLE_PROFICIENTE,
        novato: config ? config.rolesId.novato : process.env.ROLE_NOVATO,
        iniciante: config ? config.rolesId.iniciante : process.env.ROLE_INICIANTE,
        treineiro: config ? config.rolesId.treineiro : process.env.ROLE_TREINEIRO
    },
    notify: {
        study: config ? config.notify.study : process.env.NOTIFY_STUDY,
        pause: config ? config.notify.pause : process.env.NOTIFY_PAUSE
    }
}