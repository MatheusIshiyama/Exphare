const { config } = require('./utils/config');
const { bots } = require('./bots/index');

bots.manager.login(config.manager.token);