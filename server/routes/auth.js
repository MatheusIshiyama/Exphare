const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    successRedirect: '/register',
    failureRedirect: '/error'
}));

module.exports = router;