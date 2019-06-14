// eslint-disable-next-line camelcase
const order = (data, id, buyer, created_on, status, price) => {
  const newOrder = {
    id,
    buyer,
    created_on,
    car_id: data.car_id,
    status,
    price,
    price_offered: data.price_offered,
  };
  return newOrder;
};
module.exports = {
  order_model: order,
};
