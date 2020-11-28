const msg = require('../../include/message');

exports.run = (message) => {
    const queue = message.client.queue.get(message.guild.id);
    
    msg.setTitle("Skip");

    if (!queue) {
        msg.setDescription("Não estou tocando nada");
        return message.channel.send(msg);
    }

    queue.playing = true;
    queue.connection.dispatcher.end();
    msg.setDescription(`${message.author.username} passou de música.`);
    message.channel.send(msg);
}

exports.info = {
    name: "skip"
}