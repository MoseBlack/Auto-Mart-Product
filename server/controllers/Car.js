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

const getAllCars = (req, res) => {
  let response;
  const q = req.query; // Query object
  if (Object.keys(q).length === 0 && req.payload.is_admin) {
    // NO query parameters, send it all...
    response = Cars;
  } else if (Object.keys(q).length === 0 && !req.payload.is_admin) {
    // We have a query, filter response to match request
    // eslint-disable-next-line max-len
    response = Cars.filter(car => (car.status === 'available'));
  } else {
    response = Cars.filter(car => Object.keys(q).every((key) => {
      if (Object.keys(q).includes('min_price') && Object.keys(q).includes('max_price') && car.status === 'available') {
        return (car.price >= q.min_price && car.price <= q.max_price);
      }
      return (car[key].toString().toLowerCase() === q[key].toString().toLowerCase());
    }), q);
  }
  if (response.length === 0) {
    return res.status(400).json({ status: 400, error: 'No result yet' }); // status for no resources
  }
  return res.status(200).json({ status: 200, data: response });
};


module.exports = {
  post_new_car: postCar,
  all_cars: getAllCars,
  // single_car: getCar,
  // updater: updateCarStatus,
  // price_update: updateCarPrice,
  // delet: deleteCar,
  // cars: Cars,
};
