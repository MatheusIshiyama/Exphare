const ytdl = require('ytdl-core');

exports.run = async (message, args, bot) => {
    const { channel } = message.member.voice;
    const { play } = require(`../include/${bot}Play`);

    const queue = message.client.queue.get(message.guild.id);

    const queueConstruct = {
        textChannel: message.channel,
        channel,
        connection: null,
        songs: [],
        loop: false,
        volume: 100,
        playing: true,
    };

    let urlValid = await ytdl.validateURL(args);
    let songInfo,
        song = null;

    if (urlValid) {
        try {
            songInfo = await ytdl.getInfo(args);
            song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };
        } catch (error) {
            console.log(error);
            return message.reply(error.message);
        }
    };

    if(!queue) {
        message.reply(`Tocando: \`${song.title}\``);
    } else {
        queue.songs.push(song);
        return message.reply(`\`${song.title}\` adicionada na queue`);
    }

    queueConstruct.songs.push(song);
    message.client.queue.set(message.guild.id, queueConstruct);
    
    try {
        queueConstruct.connection = await channel.join();
        await queueConstruct.connection.voice.setSelfDeaf(true);
        play(queueConstruct.songs[0], message);
    } catch (error) {
        message.client.queue.delete(message.guild.id);
        await channel.leave();
        return message.channel.send("Erro: " + error);
    }
}

exports.info = {
    name: "play"
}