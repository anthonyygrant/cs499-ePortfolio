// app.js
require("dotenv").config();

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var handlebars = require("hbs");
var session = require("express-session");
var passport = require("passport");
require("./app_api/models/db");
require("./app_api/config/passport");
const cors = require('cors'); // Add this line

var indexRouter = require("./app_server/routes/index");
var usersRouter = require("./app_server/routes/users");
var travelRouter = require("./app_server/routes/travel");
var roomsRouter = require("./app_server/routes/rooms");
var newsRouter = require("./app_server/routes/news");
var mealsRouter = require("./app_server/routes/meals");
var contactRouter = require("./app_server/routes/contact");
var aboutRouter = require("./app_server/routes/about");
var apiRouter = require("./app_api/routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "app_server", "views"));
handlebars.registerPartials(__dirname + "/app_server/views/partials");
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-default-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type, Authorization'
}));

app.use("/users", usersRouter);
app.use("/api", apiRouter);

app.use("/", indexRouter);
app.use("/travel", travelRouter);
app.use("/rooms", roomsRouter);
app.use("/news", newsRouter);
app.use("/meals", mealsRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: err.name + ": " + err.message });
  }
});

module.exports = app;