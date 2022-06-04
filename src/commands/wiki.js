const nodemw = require('nodemw');
const util = require('util');
const { MessageEmbed } = require('discord.js');


const client = new nodemw({
    server : 'wiki.tamago-saba.com',
    path : '/'
  });


module.exports.run = async (bot, message, args) => {

    const wikiEmbed = new MessageEmbed()
        .setColor('#24ffff');

    if (args.length == 0) {
        wikiEmbed.setDescription('No arguments specified.');
        message.channel.send({ embeds: [wikiEmbed] });
        return;
    }

    wikiEmbed.setTitle(`Search result: "${args[0]}"`);

    const search = await util.promisify(client.search).bind(client) (args[0]);

    if (search.length == 0) {
        wikiEmbed.setDescription('No articles found.');
        message.channel.send({ embeds: [wikiEmbed] });
        return;
    }

    const pages = await Promise.all(search.map(async(result) => {
        const content = await util.promisify(client.getArticle).bind(client) (result.title);
        return { title: result.title, content: content};
    }))

    var descriptionBase = '';

    pages.forEach(page => {

        var description = page.content.trim().replace(/\r?\n/g, '');
        if (description.length > 50) {
            description = `${description.slice(0, 50)}...`;
        }
        if (description.length == 0) {
            description = "No contents found."
        }

        descriptionBase += `\n**[${page.title}](https://wiki.tamago-saba.com/wiki/${page.title})**\n\`\`\`${description}\`\`\``;

    });

    wikiEmbed.setDescription(descriptionBase.trim());

    message.reply({ embeds: [wikiEmbed], allowedMentions: { repliedUser: true } });

}


module.exports.help = {
    name:"wiki"
}
