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
        name: req.user.name
    });
})

module.exports = router;