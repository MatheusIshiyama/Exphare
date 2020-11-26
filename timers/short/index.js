const Discord = require('discord.js');
const { DISCORD, CHANNEL } = require('./utils');

const bot = new Discord.Client();
let state,
    connection,
    timer = 1;

bot.on("ready", async () => {
    console.log(
        `[Bot] Bot foi iniciado, com ${bot.users.cache.size} usuários, em ${bot.channels.cache.size} canais, em ${bot.guilds.cache.size} servidores.`
    );
    connection = await bot.channels.cache.get(CHANNEL).join();
    state = false;
});

async function selectState() {
    if(timer === 0) {
        if (state === false) {
            timer = 25;
            study();
        } else {
            timer = 5;
            pause();
        }
        state = !state;
    } else {
        timer--
    }
}

async function study() {
    // const channel = await bot.channels.cache.get(CHANNEL);
    connection.play('../../assets/study.mp3');
    console.log("study");
}

async function pause() {
    // await bot.channels.cache.get(CHANNEL).setName("Pause");
    connection.play('../../assets/pause.mp3');
    console.log("pause");
}

setInterval(selectState, 1000);

bot.login(DISCORD);