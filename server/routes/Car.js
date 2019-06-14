const express = require('express');
const controller = require('../controllers/Car');
const tokenChecker = require('../middleware/auth');

const route = express.Router();

route.post('/cars', tokenChecker.checkToken, controller.post_new_car);
route.get('/cars', tokenChecker.checkToken, controller.all_cars);
module.exports = route;
