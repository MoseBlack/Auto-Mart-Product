const express = require('express');
const controller = require('../controllers/Car');
const tokenChecker = require('../middleware/auth');

const route = express.Router();

route.post('/cars', tokenChecker.checkToken, controller.post_new_car);
route.get('/cars', tokenChecker.checkToken, controller.all_cars);
route.get('/cars/:id', tokenChecker.checkToken, controller.single_car);
route.patch('/cars/:id/status', tokenChecker.checkToken, controller.updater);
route.patch('/cars/:id/price', tokenChecker.checkToken, controller.price_update);
module.exports = route;
