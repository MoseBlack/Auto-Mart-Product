const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../helpers/config');


const Users = [
  {
    id: 1,
    firstname: 'Moses',
    lastname: 'Ngabire',
    email: 'mosestest@gmail.com',
    password: 'admin_moses123',
    is_admin: true,
  },
];
// creating new User
const createUser = (req, res) => {
  const id = Users.length + 1;
  const is_admin = false;
  let checkUser;
  Users.forEach((user) => {
    if (user.email === User.user_model(req.body, id, is_admin).email) {
      checkUser = user;
    }
  });
  if (checkUser) {
    return res.status(409).json({ status: 409, error: 'User already exist' });
  }

  if (req.body.firstname && req.body.lastname && req.body.email && req.body.password) {
    Users.push(User.user_model(req.body, id));
    const userEmail = User.user_model(req.body, id);
    const token = jwt.sign({ email: userEmail }, config.secret, { expiresIn: '1h' });

    return res.status(201).json({
      status: 201, message: 'User created successfully', data: Users[Users.length - 1], token,
    });
  } if (req.body.email === '') {
    return res.json({ message: 'Email is empty' });
  } if (req.body.firstname === '') {
    return res.json({ message: 'First name is empty' });
  }
  if (req.body.lastname === '') {
    return res.json({ message: 'Last Name is empty' });
  }
  if (req.body.password === '') {
    return res.json({ message: 'Password is empty' });
  }
  return res.status(400).json({ status: 400, error: 'Bad request. All fields are required' });
};

module.exports = {
  // all_users: Users,
  new_user: createUser,
};
