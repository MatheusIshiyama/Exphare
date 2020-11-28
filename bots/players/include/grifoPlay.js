const ytdl = require("ytdl-core");

module.exports = {
    async play(song, message) {
        const queue = message.client.queue.get(message.guild.id);

        if (!song) {
            queue.channel.leave();
            message.client.queue.delete();
            return queue.textChannel.send("🚫 A fila de musicas acabou.");
        }

        try {
            stream = await ytdl(song.url, { filter: 'audioonly' });
        } catch (error) {
            if (queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message, queue);
            }
        }

        queue.connection.on("disconnect", () => message.client.queue.delete());

        const connection = queue.connection
            .play(stream)
            .on("finish", () => {
                if (queue.loop) {
                    let lastSong = queue.songs.shift();
                    queue.songs.push(lastSong);
                    module.exports.play(queue.songs[0], message);
                } else {
                    queue.songs.shift();
                    module.exports.play(queue.songs[0], message);
                }
            })
        connection.setVolumeLogarithmic(queue.volume / 100);
    },
};