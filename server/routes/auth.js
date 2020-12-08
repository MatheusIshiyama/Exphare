const router = require('express').Router();
const passport = require('passport');

router.get('/', passport.authenticate('discord'));
router.get('/redirect', passport.authenticate('discord', {
    successRedirect: '/dashboard',
    failureRedirect: '/error'
}));

module.exports = router;