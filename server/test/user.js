const Chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

Chai.use(chaiHttp);
const { expect } = Chai;
describe('User Authentification', () => {
  it('should return status code 201 for a newly created object', (done) => {
    const payload = {
      firstname: 'moses',
      lastname: 'ngabire',
      email: 'mose@gmail.com',
      password: 'moses123',
    };
    Chai
      .request(app)
      .post('/api/v1/auth/signup')
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('token').to.be.a('string');
        expect(res.body).to.have.property('data').to.be.an('object');
        done();
      });
  });
});
