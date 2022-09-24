const express = require('express');
const path = require('path');
const dotenv = require('dotenv')

const app = express();
dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080;

app.set('view engine', 'ejs');

app.listen(PORT,() => console.log('connected host:', PORT));