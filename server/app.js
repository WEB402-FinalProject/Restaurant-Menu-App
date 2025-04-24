const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors'); //  import cors

const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const menuRoutes = require('./routes/menu.routes');
const tableRoutes = require('./routes/table.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const publicRoutes = require('./routes/public.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

require('./config/passport');
require("dotenv").config({ path: "./server/.env" });

const app = express();

//  CORS middleware
app.use(cors({
  origin: 'http://localhost:5173', // Vue dev server
  credentials: true               // only if you're using sessions/cookies
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax', // 'lax' is fine for dev; use 'none' if hosting frontend separately on https
    secure: false     // true only if using HTTPS
  }
}));


app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Public routes
app.use('/api/public', publicRoutes);

module.exports = app;
