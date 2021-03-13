const { Client, Collection } = require('discord.js');
const loadMeta = require('./helpers/loadMeta');
const checkProcess = require('./helpers/licenseCheck');
const { runCommand, loadCommands } = require('./helpers/commandHandler');
const bot = new Client();
loadMeta(Collection, bot);

bot.once('ready', () => {
    bot.user.setActivity(bot.config.bot.status.text, {type: bot.config.bot.status.type});
    loadCommands(bot);
    setInterval(() => { checkProcess(bot); }, bot.config.license.check * 3.6e+6);
    console.log('I\'m ready to give some keys');
});

bot.on('message', message => {
    runCommand(bot, message);
});

bot.login(bot.config.bot.token);