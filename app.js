require("dotenv").config();
require("./config/dbConnection"); // database initial setup
require("./helpers/hbs-helpers.js"); // utils for hbs templates

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const mongoose = require("mongoose")
var app = express();
const hbs = require('hbs')
const MongoStore = require("connect-mongo")(session);
const User = require('./models/User')
const flash = require("connect-flash")

app.use(express.json());
//session setup
// SESSION SETUP
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 6000000 }, 
    store: new MongoStore({
      mongooseConnection: mongoose.connection, 
      ttl: 24 * 60 * 60,
    }),
    saveUninitialized: true,
    resave: true,
  })
);

app.use(flash())

if(process.env.DEV_MODE=== "true"){

  app.use((req,res,next) => {
    (async () => {
      if(process.env.ADMIN_USER === "true"){
        const user = await User.findOne({role: "admin"});
        req.session.currentUser = user;
        console.log('admin')
      }else {
        const user = await User.findOne({role: "user"});
        req.session.currentUser = user;
        console.log('user')
      }
      next()
    })()
  })
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, "views/partials"));
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//custom middleware
app.use(require("./middlewares/exposeLoginStatus"));
app.use(require("./middlewares/exposeFlashMessage"));
//routes
app.use('/', require('./routes/index'))
app.use('/user', require('./routes/user'));
app.use("/auth", require("./routes/auth"));
app.use("/admin", require("./routes/admin"));

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

