const ytdl = require('ytdl-core');

exports.run = async (message, args, queue, bot) => {
    const { channel } = message.member.voice;
    const { play } = require(`../include/${bot}Play`);

    queue.textChannel = message.channel,
    queue.channel = channel;

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

    if(queue.songs.length > 0) {
        queue.songs.push(song);
        return message.reply("Musica adicionada na queue");
    }
    
    queue.songs.push(song);
    message.reply(`Tocando: ${song.title}`);
    
    try {
        queue.connection = await channel.join();
        await queue.connection.voice.setSelfDeaf(true);
        play(queue.songs[0], message, queue);
    } catch (error) {
        message.client.queue.textChannel = null;
        message.client.queue.channel = null;
        message.client.queue.songs = [];
        await channel.leave();
        return message.channel.send("Erro: " + error);
    }
}

exports.info = {
    name: "play"
}