const express = require('express');
const path = require('path');
const dotenv = require('dotenv')
const router = require('./server/routes/router');

const app = express();
dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));
app.use('/', router);

app.listen(PORT,() => console.log('connected host:', PORT));