const express = require('express');
const UserController = require('../controllers/User');

const route = express.Router();

route.post('/signup', UserController.new_user);
route.post('/signin', UserController.logged_user);
module.exports = route;
