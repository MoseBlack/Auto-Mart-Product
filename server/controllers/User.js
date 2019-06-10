// const uuid = require('uuid/v4');
const User = require('../models/User');
// const idGenerator = require('../helpers/create_id');

const Signup = (req, res) => {
  const newUser = {
    id: req.body.id,
    token: '45erkjherht45495783',
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

const Signin = (req, res) => {
  let foundUser;
  const signedUser = {
    id: req.body.id,
    token: req.body.token,
    email: req.body.email,
    password: req.body.password,
  };
  User.forEach((user) => {
    if (user.id === signedUser.id && user.token === signedUser.token && user.email === signedUser.email && user.password === signedUser.password) {
      foundUser = user;
    }
  });
  if (foundUser) {
    return res.status(200).json({ status: '200', data: foundUser });
  }
  return res.status(404).json({ status: '404', error: 'user not found' });
};
module.exports = {
  signup_user: Signup,
  signin_user: Signin,
};
