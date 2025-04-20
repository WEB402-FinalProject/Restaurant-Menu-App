const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');

require('./config/passport');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRoutes);
app.use(categoryRoutes);

module.exports = app;
