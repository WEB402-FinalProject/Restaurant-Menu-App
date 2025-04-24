const express = require('express');
const passport = require('passport');
const requireAuth = require('../middleware/authMiddleware');
const { register, login, logout } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/register', register);

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'Login successful', user });
    });
  })(req, res, next);
});

router.get('/logout', logout);

router.get(
  '/dashboard',
  requireAuth,
  (req, res) => res.send('Welcome to your dashboard')
);

module.exports = router;
