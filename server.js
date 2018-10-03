const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const key = require("./config/key");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const User = require("./models/user");
const loggedIn = require("./middleware");

// import routes
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const authRouter = require("./routes/auth");
const uploadRouter = require("./routes/upload");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: key.secret,
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// setup database connection
const db = mongoose.connection;
const { db_id, db_pw } = key;
const mongoURI = `mongodb://${db_id}:${db_pw}@ds115533.mlab.com:15533/startup-idea`;
mongoose.connect(mongoURI);
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log(`Connected to ${mongoURI}`);
});

// setup routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);

//routes that require login
app.use("/auth", loggedIn, authRouter);
app.use("/upload", loggedIn, uploadRouter);

// Serve any static files
app.use(express.static(path.join(__dirname, "client/build")));
// Handle React routing, return all requests to React app
app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
