const { MessageEmbed } = require('discord.js');

const addressEmbed = new MessageEmbed()
    .setColor('#24ffff')
    .addFields(
        { name: 'Java Edition', value: 'address: `play.tamago-saba.com`' },
        { name: 'Bedrock Edition', value: 'address: `play.tamago-saba.com`\nport: `19132`' },
    );

module.exports.run = async (bot, message, args) => {
    message.channel.send({ embeds: [addressEmbed] });
}

module.exports.help = {
    name:"address"
}