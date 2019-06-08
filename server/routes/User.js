const express = require('express');
const UserController = require('../controllers/User');

const route = express.Router();

route.post('/user', UserController.signup_user);
route.get('/user', UserController.getUser);
module.exports = route;
