const Discord = require('discord.js');
const Canvas = require('canvas');
const { config } = require('../utils/config');
const { role } = require('./include/channel');
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
    const channel = member.guild.channels.cache.find(channel => channel.name === 'boas-vindas');
	if (!channel) return;
    
    const canvas = Canvas.createCanvas(1920, 1080);
    const ctx = canvas.getContext('2d');

    // * add fonte
    Canvas.registerFont("assets/SansitaSwashed.ttf", { family: 'Sansita Swashed' });

    // * background
    const background = await Canvas.loadImage('./assets/background.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    // * sombra
    ctx.beginPath();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillRect(50, 50, 1820, 980);
    ctx.stroke();

    // * contorno da foto de perfil
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 60;
    ctx.arc(960, 350, 200, 0, Math.PI * 2, true);
    ctx.stroke();
    
    // * boas vindas e user
    ctx.fillStyle = 'rgb(48, 55, 101)';
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth = 20;
    ctx.textAlign = 'center';
    ctx.font = '110px Sansita Swashed';
    ctx.strokeText("Bem vindo(a) ao Exphare", 960, 750);
    ctx.fillText("Bem vindo(a) ao Exphare", 960, 750);
    ctx.font = '90px Sansita Swashed';
    ctx.strokeText(member.user.tag, 960, 900);
    ctx.fillText(member.user.tag, 960, 900);

    // * foto de perfil
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpeg' }));
    ctx.beginPath();
	ctx.arc(960, 350, 200, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip()
    ctx.drawImage(avatar, 760, 150, 400, 400);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), "welcome-image.png");

    channel.send(`Bem vindo(a) ${member.user} ao Exphare!`, attachment);
});

bot.on("voiceStateUpdate", async (oldState, newState) => {
    role(oldState);
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