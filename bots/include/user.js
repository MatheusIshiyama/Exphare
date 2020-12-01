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
        let time;
        
        if(newState.channelID) {
            await user.updateOne({ lastConnection: Date.now() });
        } else {
            time = Date.now() - req.lastConnection;
            await user.updateOne({ accumulatedTime: req.accumulatedTime + time });
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