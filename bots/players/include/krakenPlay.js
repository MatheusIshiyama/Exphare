const ytdl = require("ytdl-core");

module.exports = {
    async play(song, message, queue) {

        if (!song) {
            queue.channel.leave();
            message.client.queue.songs = [];
            return queue.textChannel.send("🚫 A fila de musicas acabou.");
        }

        queue.connection.on("disconnect", () => (message.client.queue.songs = []));

        try {
            stream = await ytdl(song.url, { filter: 'audioonly' });
        } catch (error) {
            if (queue) {
                queue.songs.shift();
                module.exports.play(queue.songs[0], message, queue);
            }
        }

        const connection = queue.connection
            .play(stream)
            .on("finish", () => {
                if (queue.loop) {
                    let lastSong = queue.songs.shift();
                    queue.songs.push(lastSong);
                    module.exports.play(queue.songs[0], message, queue);
                } else {
                    queue.songs.shift();
                    module.exports.play(queue.songs[0], message, queue);
                }
            })
            .on("error", (err) => {
                return console.error(err);
            });
        connection.setVolumeLogarithmic(queue.volume / 100);
    },
};