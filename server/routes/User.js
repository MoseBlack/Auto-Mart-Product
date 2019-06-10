const express = require('express');
const UserController = require('../controllers/User');

const route = express.Router();

route.post('/auth/signup', UserController.signup_user);
route.post('/auth/signin', UserController.signin_user);
module.exports = route;
