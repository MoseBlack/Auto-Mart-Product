const express = require('express');
const controller = require('../controllers/Order');
const tokenChecker = require('../middleware/auth');

const route = express.Router();

route.post('/order', tokenChecker.checkToken, controller.order);
route.patch('/order/:id/price', tokenChecker.checkToken, controller.update_order);
module.exports = route;
