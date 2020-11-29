const Discord = require('discord.js');
const { config } = require('../utils/config');
const bot = new Discord.Client();
const Canvas = require('canvas');

const longChannel = config.channels.longTimer.text;
const shortChannel = config.channels.shortTimer.text;

bot.once("ready", () => {
    console.log("[Bot Manager] Ativo");
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
})

bot.on("guildMemberAdd", async member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === 'bem-vindo');
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
    ctx.strokeText(message.author.tag, 960, 900);
    ctx.fillText(message.author.tag, 960, 900);

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
})

exports.manager = bot;