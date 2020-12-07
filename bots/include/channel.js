module.exports = {
    async role(voice) {
        let roleInfo,
            role = {
                id: null,
                name: null,
            },
            channel = {
                id: null,
                name: null,
            },
            user = {
                id: null,
                channel: null,
            };

        const userReq = await voice.guild.voiceStates.cache.filter(
            (user) => user.id === voice.id
        );

        userReq.map((userInfo) => {
            user.id = userInfo.id;
            user.channel = userInfo.channelID;
        });

        const channelReq = await voice.guild.channels.cache.filter(
            (channels) => channels.id === user.channel
        );
        channelReq.map((channelInfo) => {
            (channel.id = channelInfo.id), (channel.name = channelInfo.name);
        });

        if (channel.name) {
            role = channel;
        } else {
            role.id = voice.channel.id;
            role.name = voice.channel.name;
        }

        if (role.id === '780923515137163304') {
            roleInfo = voice.guild.roles.cache.find(
                (roles) => roles.name === "geral"
            );
        } else if (role.id === '780924250684522506') {
            roleInfo = voice.guild.roles.cache.find(
                (roles) => roles.name === "25 por 5"
            );
        } else if (role.id === '780924591722725426') {
            roleInfo = voice.guild.roles.cache.find(
                (roles) => roles.name === "50 por 10"
            );
        } else {
            roleInfo = voice.guild.roles.cache.find(
                (roles) => roles.name === role.name
            );
        }

        if (user.channel) {
            voice.guild.members.cache.get(user.id).roles.add(roleInfo);
        } else {
            voice.guild.members.cache.get(user.id).roles.remove(roleInfo);
        }
    },
};
