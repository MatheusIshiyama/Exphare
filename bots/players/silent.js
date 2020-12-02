const Discord = require('discord.js');

const bot = new Discord.Client();

bot.on("ready", () => {
    console.log("[Bot silent] Ativo");
})

exports.silent = bot;