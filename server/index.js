const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { config } = require('../utils/config');
require('./strategies/discordStrategy');
const app = express();

// * Routes
const authRoute = require('./routes/auth');
const registerRoute = require('./routes/register');

app.use(
    session({
        secret: config.client.secret,
        cookie: {
            maxAge: 60000 * 60 * 24 * 7 // * 7 dias   
        },
        saveUninitialized: false,
        resave: false,
        name: 'discord.oauth2'
    })
);

// * Passport
app.use(passport.initialize());
app.use(passport.session());

// * Middlewares Routes
app.use('/auth', authRoute);
app.use('/register', registerRoute);

app.listen(config.client.port, () => {
    console.log(`[Server] ativo na porta: ${config.client.port}`);
})