const { MessageEmbed } = require('discord.js');
const { inlineCode } = require('@discordjs/builders');

const addressEmbed = new MessageEmbed()
    .setColor('#24ffff')
    .addFields(
        {
            name: 'Java Edition',
            value: `address: ${inlineCode('play.tamago-saba.com')}`
        },
        {
            name: 'Bedrock Edition',
            value: `address: ${inlineCode('play.tamago-saba.com')}\nport: ${inlineCode(19132)}`
        }
    );

module.exports.run = async (bot, message, args) => {
    message.reply({ embeds: [addressEmbed] , allowedMentions: { repliedUser: true } });
}

module.exports.help = {
    name:"address"
}
