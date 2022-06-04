const { PREFIX } = require("../config");
const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, message, args) => {

    const helpEmbed = new MessageEmbed()
        .setColor('#24ffff')
        .setTitle('コマンドヘルプ');

    if (args.length == 0) {

        bot.commands.forEach(commandFile =>
            helpEmbed.addField(`${PREFIX}${commandFile.help.usage}`, commandFile.help.description)
        );

    } else {

        const commandFile = bot.commands.get(args[0]);

        if (commandFile === undefined) {
            helpEmbed.setDescription('コマンドが見つかりませんでした');
        } else {
            helpEmbed.addField(`${PREFIX}${commandFile.help.usage}`, commandFile.help.description)
        }

    }

    message.reply({ embeds: [helpEmbed] , allowedMentions: { repliedUser: true } });

}

module.exports.help = {
    name: 'help',
    usage: 'help [コマンド名]',
    description: 'コマンドのヘルプを表示します'
}
