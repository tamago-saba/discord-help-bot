const nodemw = require('nodemw');
const util = require('util');
const { MessageEmbed } = require('discord.js');
const { bold, hyperlink, codeBlock } = require('@discordjs/builders');


const client = new nodemw({
    server : 'wiki.tamago-saba.com',
    path : '/'
  });


module.exports.run = async (bot, message, args) => {

    const wikiEmbed = new MessageEmbed()
        .setColor('#24ffff');

    if (args.length == 0) {
        wikiEmbed.setDescription('キーワードを指定してください');
        message.reply({ embeds: [wikiEmbed], allowedMentions: { repliedUser: true } });
        return;
    }

    wikiEmbed.setTitle(`検索結果: "${args[0]}"`);

    const search = await util.promisify(client.search).bind(client) (args[0]);

    if (search.length == 0) {
        wikiEmbed.setDescription('記事が見つかりませんでした');
        message.reply({ embeds: [wikiEmbed], allowedMentions: { repliedUser: true } });
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

        const articleTitle = bold(hyperlink(page.title, `https://wiki.tamago-saba.com/wiki/${page.title}`));
        const articleContent = codeBlock(description);
        descriptionBase += `\n${articleTitle}\n${articleContent}`;

    });

    wikiEmbed.setDescription(descriptionBase.trim());

    message.reply({ embeds: [wikiEmbed], allowedMentions: { repliedUser: true } });

}


module.exports.help = {
    name:"wiki",
    usage: 'wiki キーワード',
    description: 'たまご鯖wikiを検索して結果を表示します'
}
