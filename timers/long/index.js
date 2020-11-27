const Discord = require('discord.js');
const { DISCORD } = require('./utils');

const bot = new Discord.Client();

bot.on("ready", () => {
    console.log("[Bot 50/10] Ativo")
})

bot.login(DISCORD);