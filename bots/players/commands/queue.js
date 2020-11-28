const { MessageEmbed } = require("discord.js");

exports.run = (message) => {
    const queue = message.client.queue.get(message.guild.id);

    const msg = new MessageEmbed()
        .setTitle("Queue")
        .setColor("3498DB")
        .setTimestamp(new Date())
        .setFooter("Exphare - Aprenda mais!", message.client.user.avatarURL());

    queue.songs.map((song, index) => {
        if (index === 0) {
            msg.addField(`Tocando: ${song.title}`, song.url);
        } else if (0 < index && index < 11) {
            msg.addField(song.url, `${index}. ${song.title}`);
        } else if (index === 11) {
            return msg.addField(`e mais ${queueCount - index} músicas na lista de reprodução.`, "Aproveite a música!");
        } else {
            return;
        }
    });

    message.channel.send(msg);
};

exports.info = {
    name: "queue",
};
