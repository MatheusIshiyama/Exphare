const userModel = require("../../models/user");
const { MessageEmbed } = require("discord.js");
const msgEmbed = require("../include/message");

async function userVerify(userId, name) {
    const req = await userModel.findOne({ id: userId });

    if (!req) {
        const newUser = new userModel({
            id: userId,
            name: name,
            username: null,
            password: null,
            lastConnection: Date.now(),
            accumulatedTime: 0,
            tasks: Array,
        });
        await newUser.save();
    }

    return (user = await userModel.findOne({ id: userId }));
}

function filterOption(msg) {
    return msg.content === "sim" || msg.content === "nao";
}

module.exports = {
    async userConnection(newState) {
        const user = await userVerify(newState.id, newState.member.displayName);
        const roles = newState.guild.roles.cache;
        const members = newState.guild.members.cache;
        const roleId = {
            oraculo: "783500604684894228",
            mestre: "783500602470039634",
            senior: "783500284865019914",
            veterano: "783500283186511948",
            experiente: "783500278783410186",
            proficiente: "783500268946849792",
            novato: "783500048285302784",
            iniciante: "783500040114798602",
            treineiro: "783499689860268042",
        };
        let time, role, lastRole, acT;
        let hours = 0;
        let minutes = 0;

        if (newState.channelID) {
            await user.updateOne({ lastConnection: Date.now() });
        } else {
            time = Date.now() - user.lastConnection;
            await user.updateOne({
                accumulatedTime: user.accumulatedTime + time,
            });
        }

        const newUser = await userModel.findOne({ id: newState.id });

        acT = newUser.accumulatedTime;
        acT = parseInt(acT / 1000);
        if (acT > 60) {
            for (i = 0; i < acT; i += 60) {
                minutes++;
            }
            if (minutes > 60) {
                for (i = 0; i < minutes; i += 60) {
                    hours++;
                }
            }
        }

        if (hours >= 270) {
            role = roles.get(roleId.oraculo);
            lastRole = roles.get(roleId.mestre);
        } else if (hours >= 180 && hours < 270) {
            role = roles.get(roleId.mestre);
            lastRole = roles.get(roleId.senior);
        } else if (hours >= 100 && hours < 180) {
            role = roles.get(roleId.senior);
            lastRole = roles.get(roleId.veterano);
        } else if (hours >= 50 && hours < 100) {
            role = roles.get(roleId.veterano);
            lastRole = roles.get(roleId.experiente);
        } else if (hours >= 25 && hours < 50) {
            role = roles.get(roleId.experiente);
            lastRole = roles.get(roleId.proficiente);
        } else if (hours >= 12 && hours < 25) {
            role = roles.get(roleId.proficiente);
            lastRole = roles.get(roleId.novato);
        } else if (hours >= 6 && hours < 12) {
            role = roles.get(roleId.novato);
            lastRole = roles.get(roleId.iniciante);
        } else if (hours >= 1 && hours < 6) {
            role = roles.get(roleId.iniciante);
            lastRole = roles.get(roleId.treineiro);
        } else {
            role = roles.get(roleId.treineiro);
        }

        members.get(newState.id).roles.add(role);
        if (hours >= 1) {
            members.get(newState.id).roles.remove(lastRole);
        }
    },
    async showTasks(message) {
        const channel = message.channel;
        const user = await userVerify(
            message.author.id,
            message.author.username
        );
        message.delete();

        const msg = new MessageEmbed()
            .setTitle(`Lista de afazeres de ${message.author.username}`)
            .setColor("3498DB")
            .setTimestamp(Date.now())
            .setFooter(
                "Exphare - Aprenda mais!",
                message.client.user.avatarURL()
            );

        if (!user.tasks.length) {
            msg.setDescription("O usuário não tem afazeres pendentes.");
        } else {
            let tasks = [];
            user.tasks.map((task) => (tasks += ` \`*\` ${task}\n`));
            msg.setDescription(tasks);
        }
        channel.send(msg);
    },
    async newTask(message) {
        const log = message.guild.channels.cache.get("783433795025895454");
        const user = await userVerify(
            message.author.id,
            message.author.username
        );

        if (user.tasks.length > 14) {
            log.send(
                `${message.author} sua lista de afazeres está lotada, por gentileza termine um afazer antes de adicionar outro, o limite de afazeres por usuário é 15.`
            );
        } else {
            if (user.tasks.find((task) => task === message.content)) {
                log.send(
                    `${message.author}, afazer: \`${message.content}\` já está na lista de afazeres.`
                );
            } else {
                await user.updateOne({ $push: { tasks: message.content } });
                log.send(
                    `${message.author} adicionou \`${message.content}\` na lista de afazeres.`
                );
            }
        }
    },
    async removeTask(message) {
        const log = message.guild.channels.cache.get("783433795025895454");
        const user = await userVerify(
            message.author.id,
            message.author.username,
            message.author.discriminator
        );

        if (!user.tasks.length) {
            log.send(`${message.author} Não tem afazeres.`);
        } else {
            if (user.tasks.find((task) => task === message.content)) {
                await user.updateOne({ $pull: { tasks: message.content } });
                log.send(
                    `${message.author} concluiu/removeu \`${message.content}\` da lista de afazeres.`
                );
            } else {
                log.send(
                    `${message.author}, afazer: \`${message.content}\` não está na lista de afazeres.`
                );
            }
        }
    },
    async getProfile(message) {
        const user = await userModel.findOne({ id: message.author.id });

        msgEmbed.setTitle(message.author.username);

        if (user.username) {
            msgEmbed.setDescription(
                `O usuário é: ${user.username}, caso queira alterar, utilize o comando \`username [usuario]\``
            );
        } else {
            msgEmbed.setDescription(
                "O usuário ainda não foi definido, para criar um usuário, utilize o comando `username [usuario]`"
            );
        }

        message.channel.send(msgEmbed);
    },
    async setUsername(message, Username) {
        const user = await userModel.findOne({ id: message.author.id });
        const username = Username.toLowerCase();
        const usernameVerify = await userModel.findOne({ username: username });

        msgEmbed.setTitle(`Usuário de ${message.author.username}`);

        if (usernameVerify) {
            if (usernameVerify.id === user.id) {
                msgEmbed.setDescription(
                    `O seu usuário atual já é \`${username}\``
                );
                return message.channel.send(msgEmbed);
            } else {
                msgEmbed.setDescription(
                    `O usuário \`${username}\` não está disponível.`
                );
                return message.channel.send(msgEmbed);
            }
        }

        if (user.username) {
            msgEmbed.setDescription(`O seu usuário atual é: \`${user.username}\` e será alterado para \`${username}\`\n
            **Deseja continuar?** (Digite: \`sim\` / \`nao\`)`);
        } else {
            msgEmbed.setDescription(`O usuário será alterado para \`${username}\``);
        }

        const msg = await message.channel.send(msgEmbed);

        message.channel.ativeColletor = true;
        const response = await message.channel.awaitMessages(filterOption, {
            max: 1,
            time: 15000,
            errors: ["time"],
        });
        message.channel.ativeColletor = false;
        let content;
        response.map(msg => {
            content = msg.content;
        });

        if (content === 'sim') {
            await user.updateOne({ username: username });
            msgEmbed.setDescription(`Usuário alterado para \`${username}\``);
            msg.edit(msgEmbed);
        } else if (content === 'nao') {
            msgEmbed.setDescription(`Operação cancelada.`);
            msg.edit(msgEmbed);
        }
    },
};
