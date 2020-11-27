const { manager } = require('./manager');
const { short } = require('./timers/short');
const { long } = require('./timers/long');

exports.bots = {
    manager: manager,
    short: short,
    long: long
}