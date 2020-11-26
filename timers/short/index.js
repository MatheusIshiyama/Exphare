const Discord = require('discord.js');
const { DISCORD, CHANNEL } = require('./utils');

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log(
        `[Bot] Bot foi iniciado, com ${bot.users.cache.size} usuários, em ${bot.channels.cache.size} canais, em ${bot.guilds.cache.size} servidores.`
    );
    await bot.channels.cache.get(CHANNEL).join()
});

bot.login(DISCORD);