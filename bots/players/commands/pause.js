const msg = require('../../include/message');

exports.run = message => {
    const queue = message.client.queue.get(message.guild.id);
    
    msg.setTitle("Pause");
    
    if (!queue) {
        msg.setDescription("Não estou tocando nada.");
        return message.channel.send(msg);
    }

    if (queue.playing) {
        queue.playing = false;
        queue.connection.dispatcher.pause(true);
        msg.setDescription(`${message.author.username} pausou a música.`);
        return message.channel.send(msg);
    }
}

exports.info = {
    name: "pause"
}