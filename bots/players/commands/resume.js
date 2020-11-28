const msg = require('../../include/message');

exports.run = message => {
    const queue = message.client.queue.get(message.guild.id);
    
    msg.setTitle("Resume");

    if (!queue) {
        msg.setDescription("Não estou tocando nada.");
        return message.channel.send(msg);
    }

    if (!queue.playing) {
        queue.playing = true;
        queue.connection.dispatcher.resume();
        msg.setDescription(`${message.author.username} ligou a música novamente.`);
        message.channel.send(msg);
    }
}

exports.info = {
    name: "resume"
}