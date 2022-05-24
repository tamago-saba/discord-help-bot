const logger = require("./utils/logger");
const fs = require("fs");
const { PREFIX, TOKEN } = require("./config");
const { Client, Intents, Collection } = require('discord.js');


const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES,Intents.FLAGS.GUILD_MEMBERS] });


bot.commands = new Collection();

const commandFiles = fs.readdirSync(`${__dirname}/commands/`).filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
    const props = require(`./commands/${file}`);
    logger.info(`${file} loaded.`);
    bot.commands.set(props.help.name, props);
}

const commandSubFolders = fs.readdirSync(`${__dirname}/commands/`).filter(f => !f.endsWith('.js'))
commandSubFolders.forEach(folder => {
    const commandFiles = fs.readdirSync(`${__dirname}/commands/${folder}/`).filter(f => f.endsWith('.js'))
    for (const file of commandFiles) {
        const props = require(`./commands/${folder}/${file}`);
        logger.info(`${file} loaded from ${folder}`);
        bot.commands.set(props.help.name, props);
    }
});


const eventFiles = fs.readdirSync(`${__dirname}/events/`).filter(f => f.endsWith('.js'))

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if(event.once) {
        bot.once(event.name, (...args) => event.execute(...args, bot));
    } else {
        bot.on(event.name, (...args) => event.execute(...args, bot));
    }
}


bot.on("messageCreate", async message => {

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!cmd.startsWith(PREFIX)) return;

    let commandfile = bot.commands.get(cmd.slice(PREFIX.length));
    if(commandfile) commandfile.run(bot,message,args);

});


if (TOKEN === undefined) {
    logger.error("Bot token is not set.");
    process.exit(1);
}

bot.login(TOKEN);
