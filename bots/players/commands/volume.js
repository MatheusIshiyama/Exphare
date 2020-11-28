const msg = require('../../include/message');

exports.run = (message, args) => {
    const queue = message.client.queue.get(message.guild.id);

    msg.setTitle("Volume");

    if(!queue) {
        msg.setDescription("Não estou tocando nada.");
        return message.channel.send(msg);
    }

    if(!args) {
        msg.setDescription(`O volume atual é: ${queue.volume}%`);
        return message.channel.send(msg);
    }

    if(Number(args) > 100 || Number(args) < 0) {
        msg.setDescription(`Use um número entre 0 - 100`);
        return message.channel.send(msg);
    }

    queue.volume = args;
    queue.connection.dispatcher.setVolumeLogarithmic(args/100);

    msg.setDescription(`Volume alterado para: **${args}%**`);
    message.channel.send(msg);
}

exports.info = {
    name: "volume"
}