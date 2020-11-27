exports.run = message => {
    message.member.voice.channel.join();
}

exports.info = {
    name: "join"
}