const Discord = require('discord.js');
const { config } = require('../../utils/config');

const bot = new Discord.Client();

const server = config.server;
const id = config.shortTimer.id;
const role = config.shortTimer.role;
const channel = config.channels.shortTimer.text;
const voice = config.channels.shortTimer.voice;

let state,
    status,
    msg,
    mins,
    mention,
    connection,
    timer = 1;

const msgEmbed = new Discord.MessageEmbed()
    .setTitle("Bot inicializando")
    .setColor("3498DB")
    .setTimestamp(new Date());

bot.on("ready", async () => {
    console.log("[Bot 25/5] Ativo");
    connection = await bot.channels.cache.get(voice).join();
    msg = await bot.channels.cache.get(channel).send(msgEmbed);
    msgEmbed.setFooter("Exphare", bot.user.avatarURL());
    state = false;
});

async function selectState() {
    if(timer === 0) {
        if (!state) {
            timer = 300;
            study();
        } else {
            timer = 60;
            pause();
        }
        state = !state;
    } else {
        await description();
        msg.edit(msgEmbed);
        timer--
    }
}

async function study() {
    msgEmbed.setTitle("Hora de estudo!!");
    status = "[📝]";
    await description();
    mention = await bot.channels.cache.get(channel).send(role);
    mention.delete();
    msg.edit(msgEmbed);
    connection.play(config.notify.study);
}

async function pause() {
    msgEmbed.setTitle("Hora da pausa!!");
    status = "[✋🏻]";
    await description();
    mention = await bot.channels.cache.get(channel).send(role);
    mention.delete();
    msg.edit(msgEmbed);
    connection.play(config.notify.pause);
}

async function description() {
    mins = 0;
    if (timer < 12) {
        msgEmbed.setDescription(`Tempo restante: ${timer*5} segundos.`);
        bot.guilds.cache.get(server).members.cache.get(id).setNickname(`${status} ${timer*5} segs`);
        await bot.user.setPresence({ activity: { name: `${timer*5} segundos` }});
    } else if (timer%12 === 0) {
        if (timer/12 === 1) {
            msgEmbed.setDescription(`Tempo restante: 1 minuto.`);
            bot.guilds.cache.get(server).members.cache.get(id).setNickname(`${status} 1 min`);
            await bot.user.setPresence({ activity: { name: `1 minuto` }});
        } else {
            msgEmbed.setDescription(`Tempo restante: ${timer/12} minutos.`);
            bot.guilds.cache.get(server).members.cache.get(id).setNickname(`${status} ${timer/12} mins`);
            await bot.user.setPresence({ activity: { name: `${timer/12} minutos` }});
        }
    } else {
        for(i = timer; i > 12; i -= 12) {
            mins++;
        }
        msgEmbed.setDescription(`Tempo restante: ${mins} minutos e ${(timer - (mins * 12))*5} segundos.`);
        if(mins === 1) {
            bot.guilds.cache.get(server).members.cache.get(id).setNickname(`${status} ${mins} min e ${(timer - (mins * 12))*5} segs`);
            await bot.user.setPresence({ activity: { name: `${mins} minutos e ${(timer - (mins * 12))*5} segundos` }});    
        } else {
            bot.guilds.cache.get(server).members.cache.get(id).setNickname(`${status} ${mins} mins e ${(timer - (mins * 12))*5} segs`);
            await bot.user.setPresence({ activity: { name: `${mins} minutos e ${(timer - (mins * 12))*5} segundos` }});
        }
    }
}

setInterval(selectState, 5000);

exports.short = bot;