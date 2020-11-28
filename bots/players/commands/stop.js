const msg = require('../../include/message');

exports.run = async message => {
    const queue = message.client.queue.get(message.guild.id);

    if(!queue) {
        msg
            .setTitle("Stop")
            .setDescription("Não há músicas na fila de reprodução.");
        message.channel.send(msg);
    } else {
        queue.songs = [];
        queue.connection.dispatcher.end();
    }
}

exports.info = {
    name: "stop"
}