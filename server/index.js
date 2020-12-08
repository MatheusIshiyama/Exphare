const express = require('express');
const session = require('express-session');
const passport = require('passport');
const { config } = require('../utils/config');

const app = express();

// * Routes
const authRoute = require('./routes/auth');

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
app.get('/auth', authRoute);

app.listen(config.client.port, () => {
    console.log(`[Server] ativo na porta: ${config.client.port}`);
})