var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var apiRoutes = require('./routes');
var app = express();
let schedule = require('./schedule')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', apiRoutes);
app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
})

module.exports = app;
