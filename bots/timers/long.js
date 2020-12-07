const Discord = require('discord.js');

const bot = new Discord.Client();

const server = '780889699162128424';
const id = '781680031624855582';
const role = '<@&781208789452980255>';
const channel = '781681804008357888';
const voice = '780924591722725426';

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
    console.log("[Bot 50/10] Ativo");
    connection = await bot.channels.cache.get(voice).join();
    msg = await bot.channels.cache.get(channel).send(msgEmbed);
    msgEmbed.setFooter("Exphare", bot.user.avatarURL());
    state = false;
});

async function selectState() {
    if(timer === 0) {
        if (!state) {
            timer = 600;
            study();
        } else {
            timer = 120;
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
    connection.play('https://raw.githubusercontent.com/MatheusIshiyama/Exphare/master/assets/study.mp3');
}

async function pause() {
    msgEmbed.setTitle("Hora da pausa!!");
    status = "[✋🏻]";
    await description();
    mention = await bot.channels.cache.get(channel).send(role);
    mention.delete();
    msg.edit(msgEmbed);
    connection.play('https://raw.githubusercontent.com/MatheusIshiyama/Exphare/master/assets/pause.mp3');
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

exports.long = bot;