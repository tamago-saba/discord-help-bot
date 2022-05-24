const logger = require("../utils/logger");

module.exports = {
    name: 'ready',
    once: true,
    execute(bot) {

        logger.info(`${bot.user.username} is online on ${bot.guilds.cache.size} servers.`)

    }
}
