// JavaScript source code
const express = require('express');
const app = express();
const path = require('path');
const helmet = require('helmet');
const session = require('cookie-session');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(session({
    name: 'session',
    keys: ['bd7126f457237e4aab0d47124ce4aac2', '9009def68579d15d871a5bf346422839'],
    cookie: {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 60 * 1000 * 6) // 6 horas
    },
}));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', (req, res) => {
    if (req.body.password === 'pwd') {
        req.session.user = true;
        res.redirect('/home');
    } else {
        res.redirect('/?error=senha-incorreta');
    }
});

module.exports = app;