exports.run = async message => {
    const queue = message.client.queue.get(message.guild.id);

    if(!queue) {
        message.reply("Precisa ter músicas na fila de reprodução para parar.");
    } else {
        queue.songs = [];
        queue.connection.dispatcher.end();
    }
}

exports.info = {
    name: "stop"
}