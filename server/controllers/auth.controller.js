const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, password} = req.body;
    const user = new User({ username });
    await User.register(user, password);
    res.send('User registered');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.login = (req, res) => {
  res.send('Logged in');
};

exports.logout = (req, res) => {
  req.logout(() => {
    res.send('Logged out');
  });
};
