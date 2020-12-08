const userModel = require('../../models/user');
const { MessageEmbed } = require('discord.js');

async function userVerify(userId, name) {
    const req = await userModel.findOne({ id: userId });

    if(!req) {
        const newUser = new userModel({
            id: userId,
            name: name,
            username: null,
            password: null,
            lastConnection: Date.now(),
            accumulatedTime: 0,
            toDo: Array
        });
        await newUser.save();
    }

    return user = await userModel.findOne({ id: userId });
}

module.exports = {
    async userConnection(newState) {
        const user = await userVerify(newState.id, newState.member.displayName);
        const roles = newState.guild.roles.cache;
        const members = newState.guild.members.cache;
        const roleId = {
            oraculo: '783500604684894228',
            mestre: '783500602470039634',
            senior: '783500284865019914',
            veterano: '783500283186511948',
            experiente: '783500278783410186',
            proficiente: '783500268946849792',
            novato: '783500048285302784',
            iniciante: '783500040114798602',
            treineiro: '783499689860268042'
        };
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
        const user = await userVerify(message.author.id, message.author.username);
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
        const log = message.guild.channels.cache.get('783433795025895454');
        const user = await userVerify(message.author.id, message.author.username);

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
        const log = message.guild.channels.cache.get('783433795025895454');
        const user = await userVerify(message.author.id, message.author.username);

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