var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/userRouter");
var adminRouter = require("./routes/adminRouter");

//all imports should be carried out above this line  var app = express();

var app = express(); //server is created at this point

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json()); // Here data is recieved from request.body //bodyparser is also used
app.use(express.urlencoded({ extended: false })); //by default string is recieved, but this lines with false, recieves data exactly of data type as send from frontend, like data of numbered tyoe will be number
app.use(cookieParser()); //backend recieves cookies sent from frontend
app.use(express.static(path.join(__dirname, "public")));

//paths from data will be recieved
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler if path does not match
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
