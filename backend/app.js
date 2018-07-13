import configurePassport from './passconfig';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'SJKd23aHSlDJK128sa1u9LLSjd57tuUXSkp',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

/* ROUTES */
/* payment */
const api = require('./routes/api');

app.use('/api', api);

app.use(express.static('dist'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(8080, () => console.log('Listening on port 8080!'));
