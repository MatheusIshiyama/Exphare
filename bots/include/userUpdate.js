const userModel = require('../../models/user');

module.exports = {
    async userUpdate(newState) {
        const req = await userModel.findOne({ id: newState.id });
        let time = 0;
        
        if(!req) {
            const userInfo = new userModel({
                id: newState.id,
                name: newState.member.displayName,
                voiceTime: Date.now(),
                accumulatedTime: 0,
                toDo: Array
            });
            await userInfo.save();
        }
        
        if(newState.channelID) {
            await userModel.findOneAndUpdate({ id: newState.id }, { joined: Date.now() });
        } else {
            time = Date.now() - req.joined;
            await userModel.findOneAndUpdate({ id: newState.id }, { accumulatedTime: req.accumulatedTime + time });
        }
    }
}