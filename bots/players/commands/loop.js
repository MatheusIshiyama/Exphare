const msg = require('../../include/message');

exports.run = message => {
    const queue = message.client.queue.get(message.guild.id);

    msg.setTitle("Loop");

    if (!queue) {
        msg.setDescription("Não estou tocando nada.");
        return message.channel.send(msg);
    } else {
        queue.loop = !queue.loop;
        msg.setDescription(`O loop está \`${queue.loop ? "ligado" : "desligado"}\``);
        return message.channel.send(msg);
    }
}

exports.info = {
    name: "loop"
}