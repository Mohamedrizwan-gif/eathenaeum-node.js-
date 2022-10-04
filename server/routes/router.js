const express = require('express');
const router = express.Router();
const handler = require('../controller/handle');

router.get('/', handler.index);

router.get('/login', (req, res) => {
    res.render('login', {
        title: undefined,
        login: true,
        formtitle: 'Login',
        description: 'Please fill in this form to login'
    });
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        title: undefined,
        login: false,
        formtitle: 'Register',
        description: 'Please fill in this form to create an account.'
    });
});

router.get('/result', handler.result);

router.get('/cart', (req, res) => {
    res.render('cart', {
        title: undefined
    });
});

router.post('/login', handler.login);
router.post('/signup', handler.signup);

module.exports = router;