const { MessageEmbed } = require('discord.js');

const message = new MessageEmbed()
    .setColor("3498DB")
    .setTimestamp(new Date())
    .setFooter("Exphare - Aprenda mais!", "https://cdn.discordapp.com/app-icons/688571869275881503/b5bfeb52ddae6f9492925772a59e1f8d.png?size=512");

module.exports = message;