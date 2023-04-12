// moddules for node and express
let createError = require("http-errors");
let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

// import ORacleDB- required for DB Access
let oracledbConnection = require("node-oracledb");
let DB = require("./db");
oracledbConnection.getConnection(DB.user, DB.password, DB.connectString);

module.exports = {
    oracledbConnection
  };

// define routers
let index = require("../routes/index"); // top level routes


var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', index);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
