const Discord = require('discord.js');
const fs = require('fs');

const prefix = "kr";
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let queue = {
    textChannel: null,
    channel: null,
    connection: null,
    songs: [],
    loop: false,
    volume: 100,
    playing: true
};

fs.readdir("./bots/players/commands/", (err, files) => {
    if (err) {
        console.log(err);
    }
    let commandjs = files.filter( f => f.split(".").pop() == "js");
    commandjs.forEach( f => {
        let props = require(`./commands/${f}`);
        bot.commands.set(props.info.name, props);
    })
    console.log("[Bot kraken] Comandos carregados.");
});

bot.on("ready", () => {
    console.log("[Bot kraken] Ativo");
    bot.user.setPresence({ activity: { name: "música [kr <comando>]", type: 2}})
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
        if(command === "play") {
            commandcmd.run(message, args, queue, "kraken");
        } else {
            commandcmd.run(message, args);
        }
    }
});

exports.kraken = bot;