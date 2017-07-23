//////////////////////////////////////////////////
// SETUP
//////////////////////////////////////////////////
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');

const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const configDB = require('./config/database.js');



//////////////////////////////////////////////////
// CONFIGURATION
//////////////////////////////////////////////////
mongoose.connect(configDB.url);

// require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

// set up passport
app.use(session({secret: process.env.SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes')(app, passport);

app.listen(port);
console.log(`your application is running on port: ${port}...\nYou better go and catch it.`);



