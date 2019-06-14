const Car = require('../models/Cars');
// const Owner = require('../models/User');
const Cars = [];
const postCar = (req, res) => {
  const id = Cars.length + 1;
  const owner = req.payload.email;
  const date = new Date();
  if (req.body.state && req.body.status && req.body.price && req.body.manufacturer && req.body.model && req.body.body_type) {
    Cars.push(Car.car_model(req.body, id, owner, date));
    return res.status(201).json({ status: 201, message: 'Car adv created successfully', data: Cars[Cars.length - 1] });
  }
  return res.status(400).json({ status: 400, error: 'Bad request. All fields are required' });
};

module.exports = {
  post_new_car: postCar,
  // all_cars: getAllCars,
  // single_car: getCar,
  // updater: updateCarStatus,
  // price_update: updateCarPrice,
  // delet: deleteCar,
  // cars: Cars,
};
