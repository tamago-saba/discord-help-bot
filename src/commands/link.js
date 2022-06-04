const { MessageEmbed } = require('discord.js');
const { hyperlink } = require('@discordjs/builders');

module.exports.run = async (bot, message, args) => {

    const linkEmbed = new MessageEmbed()
        .setColor('#24ffff')
        .setTitle('tamago-saba links')
        .setDescription(
            `
            - ${hyperlink('HP', 'https://www.tamago-saba.com')}
            - ${hyperlink('wiki', 'https://wiki.tamago-saba.com')}
            - ${hyperlink('Minecraft Dynmap', 'https://map.tamago-saba.com')}
            - ${hyperlink('GitHub', 'https://github.com/tamago-saba')}
            - ${hyperlink('Japan Minecraft Servers', 'https://minecraft.jp/servers/play.tamago-saba.com')}
            - ${hyperlink('YouTube', 'https://www.youtube.com/channel/UCLyRcPT4LbzW6bTJ3bw2yjQ')}
            `
            .replace(/\n\s+/g, '\n')
        )

    message.reply({ embeds: [linkEmbed] , allowedMentions: { repliedUser: true } });

}

module.exports.help = {
    name: 'link'
}
