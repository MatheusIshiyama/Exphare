const { config } = require('../config');
const { manager } = require('./manager');
const { short } = require('./timers/short');
const { long } = require('./timers/long');
const { kraken } = require('./players/kraken');
const { grifo } = require('./players/grifo');
const { valkyrie } = require('./players/valkyrie');
const { silent } = require('./players/silent');

manager.login(config.manager).then(() => {
    short.login(config.shortTimer);
    long.login(config.longTimer);
    kraken.login(config.kraken);
    grifo.login(config.grifo);
    valkyrie.login(config.valkyrie);
    silent.login(config.silent);
});