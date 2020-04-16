var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require("./config.json");
var jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.get('/ping', function(req,res){
  res.send("pong");
});
app.post('/api/users/sts', function(req, res) {
        var fName,lName;
        if(req.body && req.body.identity){
            var identity = req.body.identity;
        }        
        var clientId = config.credentials.appId//req.body.clientId;
        var clientSecret = config.credentials.apikey//req.body.clientSecret;
        var isAnonymous = req.body.isAnonymous || false;
        var aud = req.body.aud || "https://idproxy.kore.com/authorize";
        if(req.body && req.body.fName){
            fName = req.body.fName;
        }
        if (req.body && req.body.lName){
            lName = req.body.lName;
        }
        
        var options = {
            "iat": new Date().getTime(),
            "exp": new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
            "aud": aud,
            "iss": clientId,
            "sub": identity || "",
            "isAnonymous": isAnonymous
        }
        var headers = {};
        if(fName || lName) {
        headers.header = {
        "fName" : fName,
        "lName" : lName
        }
        }
        var token = jwt.sign(options, clientSecret, headers);
        res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Referrer-Policy","origin-when-cross-origin, strict-origin-when-cross-origin");
	res.header("Content-Security-Policy","default-src 'none'");
        res.send({"jwt":token});
        });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
