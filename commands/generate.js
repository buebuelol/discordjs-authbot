const { MessageEmbed } = require('discord.js');
module.exports = {
    config: {
        name: "generate"
    },
    run: async (bot, message, args) => {
        if(!message.member.roles.cache.has(bot.config.bot.authorizedRole)) return message.channel.send(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errorImg).setTitle('Action Failed').setDescription('You have insufficient permissions to execute this command.'));

        let temp = false;
        let ms;
        let expire = 'lifetime';
        let date = 'lifetime';

        if(!bot.ms(args[0])) return message.channel.send(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errorImg).setTitle('Failed to read the time'));
        if(bot.ms(args[0]) < bot.config.license.minTime * 60000 ) return message.channel.send(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errorImg).setTitle('The time has to be more than 2 minutes.'));
        if(args[0]){ temp = true; ms = (bot.ms(args[0]) + Date.now()); expire = bot.ms(ms); date = new Date(ms); };

        let key = bot.key(bot);
        let embed = await message.channel.send(new MessageEmbed().setColor(bot.config.embed.pendingColor).setAuthor(`Generating a license for ${expire}`, bot.config.embed.loadAnim));
        let authorMessage = new MessageEmbed().setColor(bot.config.embed.successColor).setTitle('Generated license:').addFields({ name: 'Key:', value: key}, { name: 'Expiry Date:', value: date });

        setTimeout(() => {
            if(temp){
                message.author.send(authorMessage).catch(() => { embed.edit(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errorImg).setTitle('Action Failed').setDescription('Your direct messages are closed.')); return; });
                bot.sql.query('INSERT INTO `licenses` (`key`, `moderator`, `timestamp`) VALUES (?, ? ,?)', [key, message.author.id, ms]);
                embed.edit(new MessageEmbed().setColor(bot.config.embed.successColor).setTitle('The licenses has been generated, check your direct messages'));
                return;
            }
            message.author.send(authorMessage).catch(() => { embed.edit(new MessageEmbed().setColor(bot.config.embed.errorColor).setThumbnail(bot.config.embed.errorImg).setTitle('Action Failed').setDescription('Your direct messages are closed.')); return; });
            bot.sql.query('INSERT INTO `licenses` (`key`, `moderator`, `timestamp`) VALUES (?, ? ,?)', [key, message.author.id, '-1']);
            embed.edit(new MessageEmbed().setColor(bot.config.embed.successColor).setTitle('The licenses has been generated, check your direct messages').setTimestamp());
        }, bot.config.license.animTimer * 1000);
    }
}