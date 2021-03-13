const sql = require('sync-mysql');
const { getKey } = require('../helpers/generateKey');
module.exports = (Collection, bot) => {
    bot.config = require('../config.json');
    bot.fs = require('fs');
    bot.ms = require('ms');
    bot.key = getKey;
    bot.commands = new Collection();
    bot.sql = new sql(bot.config.mysql);
}