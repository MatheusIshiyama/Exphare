const router = require('express').Router();
const userModel = require('../../models/user');
const bcrypt = require('bcrypt');

function isAuthorizated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/')
    }
}

async function hashAndSavePassword(id, password) {
    const saltRounds = 10;
    const user = await userModel.findOne({ id: id });
    bcrypt.genSalt(saltRounds, (error, salt) => {
        bcrypt.hash(password, salt, async (error, hash) => {
            await user.updateOne({ password: hash });
        })
    })
}

router.get('/', isAuthorizated, async (req, res) => {
    res.render('register', { 
        id: req.user.id,
        username: req.user.name,
        tag: req.user.tag
    });
})

router.post('/redirect', async (req, res) => {
    hashAndSavePassword(req.user.id, req.body.password).then(() => {
        res.redirect('/');
    });
})

module.exports = router;