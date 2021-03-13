const loadCommands = (bot) => {
    const cmds = bot.fs.readdirSync(`./commands/`).filter(d => d.endsWith('.js'));
    if(cmds === undefined || cmds.length === 0) return console.log('I couldn\'t find any command file.');

    for (let file of cmds) {
        let cmd = require(`../commands/${file}`);
        bot.commands.set(cmd.config.name, cmd);
    }
}

const runCommand = (bot, message) => {
    if(message.author.bot || message.channel.type === "dm") return;
    if(!message.content.startsWith(bot.config.bot.prefix)) return;

    let args = message.content.slice(bot.config.bot.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    let cmdFile = bot.commands.get(cmd);
    if(cmdFile) cmdFile.run(bot, message, args);
}

module.exports = { loadCommands, runCommand };