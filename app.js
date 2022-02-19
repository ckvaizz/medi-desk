var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
var mongodb = require("./config/mongodbConnection");
var mediRouter = require("./routes/medi");
var usersRouter = require("./routes/users");
var authrouter = require("./routes/auth");


mongodb.connect();
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    cors({
      origin: true, // <-- location of the react app were connecting to
      credentials: true,
    })
  );
app.use("/api/medi", mediRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth",authrouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({ err: "not found" });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send("error");
});

module.exports = app;
