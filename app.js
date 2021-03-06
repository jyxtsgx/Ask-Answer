var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var index = require('./routes/index');
var door = require('./routes/door');
var signin = require('./routes/signin');
var signup = require('./routes/signup');
var newquestion = require('./routes/api/newquestion');
var getuserquestion = require('./routes/api/getuserquestion');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname,('public'))));
app.use(express.static(path.join(__dirname,('routes'))));

app.use('/', door);
app.use('/door',door);
app.use('/signin',signin);
app.use('/signup',signup);
app.use('/api/newquestion',newquestion);
app.use('/api/getuserquestion',getuserquestion);
app.use('/users/*',users); //个人主页

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
