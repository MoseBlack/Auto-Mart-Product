const User = require('../models/User');

const Signup = (req, res) => {
  const newUser = {
    id: req.body.id,
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    address: req.body.address,
    is_admin: req.body.is_admin,
  };
  if (!req.body.email || !req.body.first_name || !req.body.last_name || !req.body.password) {
    return res.status(400).json({ status: '400', error: 'Please fill in all the required fields' });
  }
  User.push(newUser);
  return res.status(201).json({ status: '201', data: User });
};

const getUsers = (req, res) => res.json({ status: '200', data: User });
module.exports = {
  signup_user: Signup,
  getUser: getUsers,
};
