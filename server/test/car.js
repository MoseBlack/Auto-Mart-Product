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
describe('Car Management', () => {
  it('should return 201 for a new car adv post', (done) => {
    const payload = {
      state: 'new',
      status: 'available',
      price: 20000,
      manufacturer: 'BMW',
      model: 'BM 2015',
      body_type: 'truck',
    };
    Chai
      .request(app)
      .post('/api/v1/cars')
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
});
