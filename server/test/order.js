const Chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

Chai.use(chaiHttp);
const { expect } = Chai;
let userToken;
before((done) => {
  const payload = {
    email: 'mose@gmail.com',
    password: 'moses123',
    token: userToken,
  };

  Chai.request(app)
    .post('/api/v1/auth/signin')
    .send(payload)
    .end((err, res) => {
      userToken = res.body.token;
      done();
    });
});

describe('Order Management', () => {
  it('should return 201 for a new order', (done) => {
    const payload = {
      car_id: 1,
      price_offered: 10000,
    };
    Chai
      .request(app)
      .post('/api/v1/order')
      .set({ Authorization: `${userToken}` })
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.a('number');
        // expect(res.body.data.owner).to.be.equals(payload.email);
        expect(res.body).to.have.property('data').to.be.an('array');
        // expect(res.body).to.have.property('message').and.to.be.equals('Car adv created successfully');
      });
    done();
  });
  it('should return 400 if no order found to update', (done) => {
    const payload = {
      new_price_offered: 10000,
    };
    Chai
      .request(app)
      // eslint-disable-next-line no-template-curly-in-string
      .patch('/api/v1/order/`${id}`/price')
      .set({ Authorization: `${userToken}` })
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('error').and.to.be.equals('order not found');
      });
    done();
  });

  it('should return 200 if order found and updated ', (done) => {
    const payload = {
      new_price_offered: 10000,
    };
    Chai
      .request(app)
      // eslint-disable-next-line no-template-curly-in-string
      .patch('/api/v1/order/`${id}`/price')
      .set({ Authorization: `${userToken}` })
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('data').to.be.an('object');
        expect(res.body).to.have.property('message').and.to.be.equals('car order updated');
      });
    done();
  });
});
