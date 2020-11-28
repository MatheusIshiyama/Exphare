const msg = require('../../include/message');

exports.run = message => {
    const queue = message.client.queue.get(message.guild.id);
    
    msg.setTitle("Shuffle");

    if(!queue) {
        msg.setDescription("Não estou tocando nada.");
        return message.channel.send(msg);
    } else {   
        let songs = queue.songs;
        for (let i = songs.length - 1; i > 1; i--) {
            let j = 1 + Math.floor(Math.random() * i);
            [songs[i], songs[j]] = [songs[j], songs[i]];
        }
        queue.songs = songs;
        message.client.queue.set(message.guild.id, queue);
        msg.setDescription(`${message.author.username} embaralhou a lista de reprodução.`);
        message.channel.send(msg);
    }
}

exports.info = {
    name: "shuffle"
}