const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { fullname, username, password } = req.body;
    const user = new User({ fullname, username });
    await User.register(user, password);
    res.status(200).json({ message: 'User registered' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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
