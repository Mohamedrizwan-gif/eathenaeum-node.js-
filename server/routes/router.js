const express = require('express');
const router = express.Router();
const page_handler = require('../controller/page_handler');
const page_handler_index = require('../controller/page_handler/index');
const page_handler_view = require('../controller/page_handler/view');
const auth_handler = require('../controller/auth_handler');

router.get('/', page_handler_index);
router.get('/view', page_handler_view);
router.get('/cart', page_handler.getcart);

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

router.post('/login', auth_handler.login);
router.post('/signup', auth_handler.signup);
router.post('/cart', page_handler.postcart);

module.exports = router;