const router = require('express').Router();
const userModel = require('../../models/user');

function isAuthorizated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/')
    }
}

router.get('/', isAuthorizated, async (req, res) => {
    const user = await userModel.findOne({ id: req.user.id });
    res.send(user);
})

module.exports = router;