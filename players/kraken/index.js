const Discord = require('discord.js');
const fs = require('fs');
const { DISCORD } = require('./utils');

const prefix = "kraken ";
const bot = new Discord.Client();
bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
    if (err) {
        console.log(err);
    }
    let commandjs = files.filter((f) => f.split(".").pop() == "js");
    commandjs.forEach( f => {
        let props = require(`./commands/${f}`);
        console.log(`[Bot kraken] Comando ${f} carregado com sucesso.`);
        bot.commands.set(props.info.name, props);
    });
});

bot.on("ready", () => {
    console.log("[Bot Kraken] Ativo");
})

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
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
        commandcmd.run(message, args);
    }
})

bot.login(DISCORD);