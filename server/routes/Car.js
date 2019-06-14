const express = require('express');
const controller = require('../controllers/Car');
const tokenChecker = require('../middleware/auth');

const route = express.Router();

route.post('/cars', tokenChecker.checkToken, controller.post_new_car);
module.exports = route;
