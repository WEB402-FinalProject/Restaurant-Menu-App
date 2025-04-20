const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const { register, login, logout } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);

router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/dashboard',
  }),
  login
);

router.get('/logout', logout);

router.get(
  '/dashboard',
  ensureLogin.ensureLoggedIn(),
  (req, res) => res.send('Welcome to your dashboard')
);

module.exports = router;
