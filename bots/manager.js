const Discord = require('discord.js');
const { config } = require('../utils/config');
const { welcome } = require('./include/welcome');
const { role } = require('./include/channel');
const { userUpdate } = require('./include/user');
const { help } = require('./include/help');

const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

let presence = false;
const longChannel = config.channels.longTimer.text;
const shortChannel = config.channels.shortTimer.text;

bot.once("ready", () => {
    console.log("[Bot Manager] Ativo");
    bot.user.setPresence({ activity: { name: "lo-fi | precisa de ajuda? digite !comandos", type: 2 }});
    bot.channels.cache.get(longChannel).messages
        .fetch()
        .then(msg =>
            msg.forEach(msg => msg.delete())
        );
    bot.channels.cache.get(shortChannel).messages
        .fetch()
        .then(msg =>
            msg.forEach(msg => msg.delete())
        );
});

bot.on("messageReactionAdd", async (reaction, user) => {
	if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
    }
	if(reaction.message.channel.messages.cache.get(config.confirm)) {
        const role = reaction.message.guild.roles.cache.find(role => role.name === "membro");
        reaction.message.guild.members.cache.get(user.id).roles.add(role);
    }
});

bot.on("messageReactionRemove", async (reaction, user) => {
    if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
	}
	if(reaction.message.channel.messages.cache.get(config.confirm)) {
        const role = reaction.message.guild.roles.cache.find(role => role.name === "membro");
        reaction.message.guild.members.cache.get(user.id).roles.remove(role);
    }
});

bot.on("guildMemberAdd", async member => {
    welcome(member);
});

bot.on("voiceStateUpdate", async (oldState, newState) => {
    role(oldState);
    userUpdate(newState);
});

bot.on("message", async message => {
    if (message.content === "!comandos") {
        help(message);
    }
});

async function botPresence() {
    presence = !presence;
    if(presence) {
        bot.user.setPresence({ activity: { name: "Exphare deseja bons estudos a todos!"}});
    } else {
        bot.user.setPresence({ activity: { name: "lo-fi | precisa de ajuda? digite !comandos", type: 2 }});
    }
};

setInterval(botPresence, 11000);

exports.manager = bot;