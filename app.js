var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');

var routes = require('./routes/index');
var users = require('./routes/users');

var keys = require("./keys");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


app.get('/api', function(req, res) {
    request.post("https://anilist.co/api/auth/access_token?grant_type=" + keys.grant_type + "&client_id=" + keys.client_id + "&client_secret=" + keys.client_secret,
        function(err, response, body) {
            body = JSON.parse(body); // getting authorization credentials
            request('https://anilist.co/api/anime/20?access_token=' + body.access_token + "&token_type=" + body.token_type, function(error, response, body) {
                if (!error && response.statusCode == 200) { // 
                    var data = JSON.parse(body) // making actual request to api
                    
                }
                res.json(body);
            });
        });
});

app.get('/test', function(req, res) {
    request('http://www.google.com', function(error, response, body) {
        if(!error && response.statusCode == 200){
            console.log(body);
        }
        res.send(body);
    });
});




// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;