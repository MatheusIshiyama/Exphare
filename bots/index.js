const { manager } = require('./manager');
const { short } = require('./timers/short');

exports.bots = {
    manager: manager,
    short: short
}