const router = require('express').Router();
const User = require('../schema/User');

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        password: req.body.password
    });
    user.save((err) => {
        if (err) {
            res.status(500).send('Error registering new user ' + err.message);
        } else {
            res.status(200).send('Successfully registered user');
        }
    });
});

router.post('/login', (req, res) => {
    const { name, password } = req.body;
    User.findOne({ name }, function (err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect name or password'
                });
        } else {
            user.isCorrectPassword(password, function (err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect name or password'
                        });
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
})


module.exports = router;