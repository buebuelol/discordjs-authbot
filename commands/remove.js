const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "delete"
    },
    run: async (bot, message, args) => {
        if(!message.member.roles.cache.has(bot.config.bot.authorizedRole)) return message.channel.send(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errorImg).setTitle('Action Failed').setDescription('You have insufficient permissions to execute this command.'));
        const key = args[0];
        if(!key) return message.channel.send(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errorImg).setTitle('Failed to read the key.'));

        let embed = await message.channel.send(new MessageEmbed().setColor(bot.config.embed.pendingColor).setAuthor('Deleting license...', bot.config.embed.loadAnim));

        setTimeout(() => {
            let count = bot.sql.query('SELECT COUNT(*) as count FROM `licenses` WHERE `key` = ?', [key])[0].count;
            if(count && count === 0) return embed.edit(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errorImg).setTitle('This key does not exist in the database'));
            bot.sql.query('DELETE FROM `licenses` WHERE `key` = ?',[key]);
            embed.edit(new MessageEmbed().setColor(bot.config.embed.successColor).setTitle('The license has been successfully deleted.').setTimestamp());
        }, bot.config.license.animTimer * 1000);
    }
}