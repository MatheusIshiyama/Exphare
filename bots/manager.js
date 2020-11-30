const Discord = require('discord.js');
const Canvas = require('canvas');
const { config } = require('../utils/config');

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

bot.on("voiceStateUpdate", async voice => {

    let roleInfo,
        role = {
            id: null,
            name: null
        },
        channel = {
            id: null,
            name: null
        },
        user = {
            id: null,
            channel: null
        };

    const userReq = await voice.guild.voiceStates.cache.filter(user => user.id === voice.id);

    userReq.map(userInfo => {
        user.id = userInfo.id;
        user.channel = userInfo.channelID;
    })

    const channelReq = await voice.guild.channels.cache.filter(channels => channels.id === user.channel);
    channelReq.map(channelInfo => {
        channel.id = channelInfo.id,
        channel.name = channelInfo.name
    });
    
    if (channel.name) {
        role = channel;
    } else {
        role.id = voice.channel.id;
        role.name = voice.channel.name;
    }
    
    if (role.id === config.channels.general) {
        roleInfo = voice.guild.roles.cache.find(roles => roles.name === "geral");
    } else if (role.id === config.channels.shortTimer.voice) {
        roleInfo = voice.guild.roles.cache.find(roles => roles.name === "25 por 5");
    } else if (role.id === config.channels.longTimer.voice) {
        roleInfo = voice.guild.roles.cache.find(roles => roles.name === "50 por 10");
    } else {
        roleInfo = voice.guild.roles.cache.find(roles => roles.name === role.name);
    }

    if (user.channel) {
        voice.guild.members.cache.get(user.id).roles.add(roleInfo)
    } else {
        voice.guild.members.cache.get(user.id).roles.remove(roleInfo)
    }
});

bot.on("message", async message => {
    if (message.content === "!comandos") {
        const help = new Discord.MessageEmbed()
            .setTitle("Exphare - Aprenda mais!")
            .setDescription("Comandos do servidor")
            .setColor("3498DB")
            .setTimestamp(new Date())
            .setFooter("Exphare - Aprenda mais!", message.client.user.avatarURL())
            .addFields(
                {
                    name: "Bots disponíveis",
                    value: "Exphare - Grifo [gr <comando>]\nExphare - Kraken [kr <comando>]\nExphare - Valkyrie [vk <comando>]"
                },
                {
                    name: "Comandos",
                    value: "*exemplo:* `gr join`"
                },
                {
                    name: "join",
                    value: "Fazer o bot entrar no mesmo canal de voz que o solicitante"
                },
                {
                    name: "leave",
                    value: "Fazer o bot sair do canal de voz"
                },
                {
                    name: "loop",
                    value: "Ligar ou desligar a repetição da lista de reprodução"
                },
                {
                    name: "now",
                    value: "Mostrar música atual"
                },
                {
                    name: "pause",
                    value: "Pausar a música"
                },
                {
                    name: "play <link da música no Youtube>",
                    value: "Tocar música do youtube"
                },
                {
                    name: "queue",
                    value: "Mostrar lista de reprodução"
                },
                {
                    name: "resume",
                    value: "Retomar música"
                },
                {
                    name: "shuffle",
                    value: "Embaralhar lista de reprodução"
                },
                {
                    name: "skip",
                    value: "Pular música atual"
                },
                {
                    name: "stop",
                    value: "Parar a música"
                },
                {
                    name: "volume <número 0-100>",
                    value: "Ajustar volume do bot (valor entre 0 - 100)"
                },
            )

        const msg = await message.channel.send(help);
        setTimeout(() => msg.delete(), 30000);
        message.delete();
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