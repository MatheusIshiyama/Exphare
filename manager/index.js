const Discord = require('discord.js');
const { DISCORD } = require('./utils');
const bot = new Discord.Client();

bot.once("ready", () => {
    console.log(
        `[Bot] Bot foi iniciado, com ${bot.users.cache.size} usuários, em ${bot.channels.cache.size} canais, em ${bot.guilds.cache.size} servidores.`
    );
})

bot.on("voiceStateUpdate", async voice => {

    let channel,
        role,
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
    channelReq.map(channelInfo => channel = channelInfo.name);
    
    role = voice.guild.roles.cache.find(role => role.name === (channel ? channel : voice.channel.name));

    if (user.channel) {
        voice.guild.members.cache.get(user.id).roles.add(role)
    } else {
        voice.guild.members.cache.get(user.id).roles.remove(role)
    }
})

bot.login(DISCORD);