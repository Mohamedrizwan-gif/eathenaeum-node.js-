const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        title: 'E-Athenaeum'
    });
});

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

router.get('/cart', (req, res) => {
    res.render('cart');
});

module.exports = router;