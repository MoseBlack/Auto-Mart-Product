// const moment = require('moment');
// const Owner = require('./User');

const car = (data, id, owner, date) => {
  const newCar = {
    id,
    owner,
    created_on: date,
    state: data.state,
    status: data.status,
    price: data.price,
    manufacturer: data.manufacturer,
    model: data.model,
    body_type: data.body_type,
  };
  return newCar;
};

module.exports = {
  car_model: car,
};
