exports.run = async (message, args) => {
    message.member.voice.channel.join();
}

exports.info = {
    name: "join"
}