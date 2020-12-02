const userModel = require('../../models/user');
const { MessageEmbed } = require('discord.js');
const { config } = require('../../utils/config');

async function userVerify(user, username) {
    const req = await userModel.findOne({ id: user.id });

    if(!req) {
        const newUser = new userModel({
            id: user.id,
            name: username,
            lastConnection: Date.now(),
            accumulatedTime: 0,
            toDo: Array
        });
        await newUser.save();
    }

    return user = await userModel.findOne({ id: user.id });
}

module.exports = {
    async userConnection(newState) {
        const user = await userVerify(newState, newState.member.displayName);
        const roles = newState.guild.roles.cache;
        const member = newState.guild.members.cache;
        const id = config.rolesIds;
        let time,
            role,
            lastRole,
            acT;
        let hours = 0;
        let minutes = 0;
        
        if(newState.channelID) {
            await user.updateOne({ lastConnection: Date.now() });
        } else {
            time = Date.now() - user.lastConnection;
            await user.updateOne({ accumulatedTime: user.accumulatedTime + time });
        }

        const newUser = await userModel.findOne({ id: newState.id });

        acT = newUser.accumulatedTime;
        acT = parseInt(acT/1000);
        if (acT > 60) {
            for(i = 0; i < acT; i += 60) {
                minutes++;
            };
            if (minutes > 60) {
                for(i = 0; i < minutes; i += 60) {
                    hours++;
                }
            }
        };

        if (hours >= 270) {
            role = roles.get(id.oraculo);
            lastRole = roles.get(id.mestre);
        } else if (hours >= 180 && hours < 270) {
            role = roles.get(id.mestre);
            lastRole = roles.get(id.senior);
        } else if (hours >= 100 && hours < 180) {
            role = roles.get(id.senior);
            lastRole = roles.get(id.veterano);
        } else if (hours >= 50 && hours < 100) {
            role = roles.get(id.veterano);
            lastRole = roles.get(id.experiente);
        } else if (hours >= 25 && hours < 50) {
            role = roles.get(id.experiente);
            lastRole = roles.get(id.proficiente);
        } else if (hours >= 12 && hours < 25) {
            role = roles.get(id.proficiente);
            lastRole = roles.get(id.novato);
        } else if (hours >= 6 && hours < 12) {
            role = roles.get(id.novato);
            lastRole = roles.get(id.iniciante);
        } else if (hours >= 1 && hours < 6) {
            role = roles.get(id.iniciante);
            lastRole = roles.get(id.treineiro);
        } else {
            role = roles.get(id.treineiro);
        }

        member.get(newState.id).roles.add(role);
        if (hours >= 1) { 
            member.get(newState.id).roles.remove(lastRole);
        }
    },
    async showTasks(message) {
        const channel = message.channel;
        const user = await userVerify(message.author, message.author.username);
        message.delete();

        const msg = new MessageEmbed()
            .setTitle(`Lista de afazeres de ${message.author.username}`)
            .setColor("3498DB")
            .setTimestamp(Date.now())
            .setFooter("Exphare - Aprenda mais!", message.client.user.avatarURL());

        if (!user.toDo.length) {
            msg.setDescription('O usuário não tem afazeres pendentes.');
        } else {
            let tasks = [];
            user.toDo.map(task => tasks += ` \`*\` ${task}\n`);
            msg.setDescription(tasks);    
        }
        channel.send(msg);
    },
    async newTask(message) {
        const log = message.guild.channels.cache.get(config.channels.logs);
        const user = await userVerify(message.author, message.author.username);

        if(user.toDo.length > 14) {
            log.send(`${message.author} sua lista de afazeres está lotada, por gentileza termine um afazer antes de adicionar outro, o limite de afazeres por usuário é 15.`);
        } else {
            if (user.toDo.find(todo => todo === message.content)) {
                log.send(`${message.author}, afazer: \`${message.content}\` já está na lista de afazeres.`);
            } else {
                await user.updateOne({ $push: { toDo: message.content } });
                log.send(`${message.author} adicionou \`${message.content}\` na lista de afazeres.`);
            }
        }
    },
    async removeTask(message) {
        const log = message.guild.channels.cache.get(config.channels.logs);
        const user = await userVerify(message.author, message.author.username);

        if (!user.toDo.length) {
            log.send(`${message.author} Não tem afazeres.`);
        } else {
            if (user.toDo.find(todo => todo === message.content)) {
                await user.updateOne({ $pull: { toDo: message.content } });
                log.send(`${message.author} concluiu/removeu \`${message.content}\` da lista de afazeres.`);
            } else {
                log.send(`${message.author}, afazer: \`${message.content}\` não está na lista de afazeres.`);
            }
        }
    }
}