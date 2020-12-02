const { Schema, model } = require('mongoose');

const Configs = new Schema({
    id: String,
    mongodb: String,
    confirm: String,
    manager: {
        token: String
    },
    silent: {
        token: String
    },
    longTimer: {
        id: String,
        token: String,
        role: String
    },
    shortTimer: {
        id: String,
        token: String,
        role: String
    },
    kraken: {
        id: String,
        token: String
    },
    grifo: {
        id: String,
        token: String
    },
    valkyrie: {
        id: String,
        token: String
    },
    channels: {
        general: String,
        longTimer: {
            text: String,
            voice: String
        },
        shortTimer: {
            text: String,
            voice: String
        },
        logs: String,
        toDo: String,
        add: String,
        remove: String,
    },
    rolesIds: {
        oraculo: String,
        mestre: String,
        senior: String,
        veterano: String,
        experiente: String,
        proficiente: String,
        novato: String,
        iniciante: String,
        treineiro: String
    },
    notify: {
        study: String,
        pause: String
    }
})

module.exports = model("Configs", Configs);