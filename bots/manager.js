const Discord = require('discord.js');
const { config } = require('../utils/config');
const bot = new Discord.Client();

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