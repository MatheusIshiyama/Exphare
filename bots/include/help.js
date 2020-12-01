const { MessageEmbed } = require('discord.js');

module.exports = {
    async help(message) {
        const help = new MessageEmbed()
            .setTitle("Exphare - Aprenda mais!")
            .setDescription("Comandos do servidor")
            .setColor("3498DB")
            .setTimestamp(new Date())
            .setFooter("Exphare - Aprenda mais!", message.client.user.avatarURL())
            .addFields(
                {
                    name: "Bots disponíveis",
                    value: "Exphare - Grifo [gr <comando>]\nExphare - Kraken [kr <comando>]\nExphare - Valkyrie [vk <comando>]"
                },
                {
                    name: "Comandos",
                    value: "*exemplo:* `gr join`"
                },
                {
                    name: "join",
                    value: "Fazer o bot entrar no mesmo canal de voz que o solicitante"
                },
                {
                    name: "leave",
                    value: "Fazer o bot sair do canal de voz"
                },
                {
                    name: "loop",
                    value: "Ligar ou desligar a repetição da lista de reprodução"
                },
                {
                    name: "now",
                    value: "Mostrar música atual"
                },
                {
                    name: "pause",
                    value: "Pausar a música"
                },
                {
                    name: "play <link da música no Youtube>",
                    value: "Tocar música do youtube"
                },
                {
                    name: "queue",
                    value: "Mostrar lista de reprodução"
                },
                {
                    name: "resume",
                    value: "Retomar música"
                },
                {
                    name: "shuffle",
                    value: "Embaralhar lista de reprodução"
                },
                {
                    name: "skip",
                    value: "Pular música atual"
                },
                {
                    name: "stop",
                    value: "Parar a música"
                },
                {
                    name: "volume <número 0-100>",
                    value: "Ajustar volume do bot (valor entre 0 - 100)"
                },
            )

        const msg = await message.channel.send(help);
        setTimeout(() => msg.delete(), 30000);
        message.delete();
    }
}