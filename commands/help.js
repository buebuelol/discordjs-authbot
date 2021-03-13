const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "help"
    },
    run: (bot, message) => {
       message.channel.send(new MessageEmbed().setColor(bot.config.embed.successColor).setTitle('Help Menu').setDescription(`${bot.config.bot.prefix}generate (ex. 5days or leave empty for lifetime)\n${bot.config.bot.prefix}delete (key)`).setTimestamp());
    }
}
