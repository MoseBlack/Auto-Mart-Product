const express = require('express');
const UserController = require('../controllers/User');

const route = express.Router();

route.post('/signup', UserController.new_user);

module.exports = route;
