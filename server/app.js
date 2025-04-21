const express = require('express');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const menuRoutes = require('./routes/menu.routes');

require('./config/passport');
require("dotenv").config({ path: "./server/.env" });

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
app.use('/api/auth',authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/menu', menuRoutes);

module.exports = app;
