const Discord = require('discord.js');
const fs = require('fs');

const prefix = "vk";
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
bot.queue = new Map();

fs.readdir("./bots/players/commands/", (err, files) => {
    if (err) {
        console.log(err);
    }
    let commandjs = files.filter( f => f.split(".").pop() == "js");
    let commands = 0;
    commandjs.forEach( f => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.info.name, props);
        commands++;
    })
    console.log(`[Bot valkyrie] ${commands} Comandos carregados.`);
});

bot.on("ready", () => {
    console.log("[Bot valkyrie] Ativo");
    bot.user.setPresence({ activity: { name: "música | [vk <comando>]", type: 1, url: 'https://twitch.tv/bravanzin' }});
});

bot.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    const arg = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = arg.shift().toLowerCase();
    let args = arg.shift();
    
    while (arg.length > 0) {
        args = args + " " + arg[0];
        arg.shift();
    }
    
    const commandcmd = bot.commands.get(command);
    if (commandcmd) {
        commandcmd.run(message, args, "valkyrie");
    }
});

exports.valkyrie = bot;