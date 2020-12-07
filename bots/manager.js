const Discord = require('discord.js');
const { welcome } = require('./include/welcome');
const { role } = require('./include/channel');
const { userConnection, showTasks, newTask, removeTask } = require('./controller/user');
const { help } = require('./include/help');

const bot = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION']});

let presence = false;
const botsIds = [
    '781680031624855582', // * longTimer
    '781517289685778455', // * shortTimer
    '781872955298152491', // * kraken
    '782030076278472734', // * grifo
    '782344032264126464', // * valkyrie
    '783693873674977292', // * silent
];

bot.once("ready", () => {
    console.log("[Bot Manager] Ativo");
    bot.user.setPresence({ activity: { name: "lo-fi | precisa de ajuda? digite !comandos", type: 2 }});
    bot.channels.cache.get('781681804008357888').messages
        .fetch()
        .then(msg =>
            msg.forEach(msg => msg.delete())
        );
    bot.channels.cache.get('782269834750197770').messages
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
	if(reaction.message.channel.messages.cache.get('782770889325936640')) {
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
	if(reaction.message.channel.messages.cache.get('782770889325936640')) {
        const role = reaction.message.guild.roles.cache.find(role => role.name === "membro");
        reaction.message.guild.members.cache.get(user.id).roles.remove(role);
    }
});

bot.on("guildMemberAdd", async member => {
    welcome(member);
});

bot.on("voiceStateUpdate", async (oldState, newState) => {
    botsIds.forEach(botId => { if(newState.id === botId) return });
    role(oldState);
    userConnection(newState);
});

bot.on("message", async message => {
    if (message.author.bot) return;
    const id = message.channel.id;
    if(id === '783434206697095198') {
        showTasks(message);
    } else if (id === '783395377557929984') {
        newTask(message);
    } else if (id === '783395951527067679') {
        removeTask(message);
    } else if (message.content === "!comandos") {
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