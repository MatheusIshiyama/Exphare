const Discord = require('discord.js');
const ytdl = require('ytdl-core');

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log("[Bot silent] Ativo");
    bot.user.setPresence({ activity: { name: "lofi", type: 1, url: 'https://twitch.tv/bravanzin' }});
})

bot.setTimeout(async () => {
    const channel = await bot.channels.cache.get('780926305101021241').join();
    channel.play(ytdl("https://www.youtube.com/watch?v=5qap5aO4i9A"));
}, 3000);

exports.silent = bot;