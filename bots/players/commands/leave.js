exports.run = message => {
    message.member.voice.channel.leave();
}

exports.info = {
    name: "leave"
}