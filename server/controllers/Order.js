/* eslint-disable camelcase */
const Order = require('../models/Order');
const Cars = require('../controllers/Car');

const Orders = [];
const postOrder = (req, res) => {
  let carOrdered;
  const id = Orders.length + 1;
  const buyer = req.payload.email;
  // eslint-disable-next-line camelcase
  const created_on = new Date();
  // eslint-disable-next-line consistent-return
  Orders.forEach((order) => {
    if (order.buyer === buyer && order.car_id === req.body.car_id) {
      return res.json({ message: 'Car already Ordered' });
    }
  });
  Cars.cars.forEach((car) => {
    if (req.body.car_id && req.body.price_offered && car.id === req.body.car_id) {
      carOrdered = car;
      const { status } = carOrdered;
      const { price } = carOrdered;
      Orders.push(Order.order_model(req.body, id, buyer, created_on, status, price));
    }
  });
  if (carOrdered) {
    return res.status(201).json({ status: 201, message: 'Ordered created', data: Orders });
  }
  return res.status(400).json({ status: 400, error: 'Bad request. All fields are required' });
};

const updateOrder = (req, res) => {
  let orderfound;
  Orders.forEach((order) => {
    if (order.id === parseInt(req.params.id, 10)) {
      orderfound = order;
    }
  });
  if (!orderfound || orderfound.status === 'pending') {
    return res.status(400).json({ status: 400, error: 'order not found' });
  }
  orderfound.old_price_offered = orderfound.price_offered;
  orderfound.price_offered = req.body.new_price_offered ? req.body.new_price_offered : carfound.price_offered;

  return res.status(200).json({ status: 200, message: 'car order updated', data: orderfound });
};
module.exports = {
  order: postOrder,
  update_order: updateOrder,
};
