const router = require('express').Router();

function isAuthorizated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/')
    }
}

router.get('/', isAuthorizated, async (req, res) => {
    res.render('register', { 
        id: req.user.id,
        username: req.user.name,
        tag: req.user.tag
    });
})

router.post('/', async (req, res) => {
    console.log(req.body);
    console.log(req.user);
    res.sendStatus(200);
})

module.exports = router;