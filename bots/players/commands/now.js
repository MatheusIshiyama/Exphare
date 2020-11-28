const msg = require('../../include/message');

exports.run = message => {
    const queue = message.client.queue.get(message.guild.id);

    msg.setTitle("Tocando agora");

    if (!queue) {
        msg.setDescription("Não estou tocando nada.");
        return message.channel.send(msg);
    }
    const song = queue.songs[0];
    msg.setDescription(`\`${song.title}\`\n${song.url}`);
    message.channel.send(msg);
}

exports.info = {
    name: "now"
}