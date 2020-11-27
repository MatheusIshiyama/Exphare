const { manager } = require('./manager');
const { short } = require('./timers/short');
const { long } = require('./timers/long');
const { kraken } = require('./players/kraken');

exports.bots = {
    manager: manager,
    short: short,
    long: long,
    kraken: kraken
}