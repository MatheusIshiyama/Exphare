const { config } = require('./utils/config');
const { bots } = require('./bots/index');

bots.manager.login(config.manager.token).then(() => {
    bots.short.login(config.shortTimer.token);
    bots.long.login(config.longTimer.token);
    bots.kraken.login(config.kraken.token);
    bots.grifo.login(config.grifo.token);
});