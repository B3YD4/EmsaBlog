const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const Blog = require('./models/blogSchema');

const indexRouter = require('./routes/index');

const uri = "mongodb+srv://CodeHub:b3yd4159357@codeblog.kgiin.mongodb.net/EmsaBlog?retryWrites=true&w=majority"

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Veritabanı Bağlantısı

mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('open', ()=> {
  console.log("Bağlantı Başarı İle Sağlandı.");
});
mongoose.connection.on('error', (err) => {
  console.log("Bağlantı Hatası.",err);
});


module.exports = app;
