let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mosh', {useNewUrlParser: true});
let passport = require('passport');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let postRouter = require('./routes/api/post');
let userRouter = require('./routes/api/user');
let profileRouter = require('./routes/api/profile')

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport
require('./config/passport');

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/post', postRouter);
app.use('/api/user', userRouter);
app.use('/api/profile', profileRouter);

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
