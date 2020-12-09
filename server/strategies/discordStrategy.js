const DiscordStrategy = require('passport-discord').Strategy;
const userModel = require('../../models/user');
const passport = require('passport');
const { config } = require('../../config');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (userId, done) => {
    const user = await userModel.findOne({ id: userId });
    if (user) {
        done(null, user);
    }
});

passport.use(new DiscordStrategy({
    clientID: config.client.id,
    clientSecret: config.client.secret,
    callbackURL: '/auth/redirect',
    scope: ['identify']
}, async (accessToken, refreshToken, profile, done) => {
    const userRequest = await userModel.findOne({ id: profile.id });
    if(!userRequest) {
        const newUser = new userModel({
            id: profile.id,
            username: profile.username,
            discriminator: profile.discriminator,
            lastConnection: 0,
            accumulatedTime: 0,
            toDo: Array
        });
        const savedUser = await newUser.save();
        done(null, savedUser);
    } else {
        done(null, userRequest);
    }
}))