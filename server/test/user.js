const Chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

Chai.use(chaiHttp);
const { expect } = Chai;
describe('User Authentification', () => {
  it('should return status code 201 for a newly created object', (done) => {
    const newUser = {
      id: 1,
      email: 'user_1@gmail.com',
      first_name: 'Koby',
      last_name: 'Bryant',
      password: 'losangeles123',
      address: 'Lakers',
      is_admin: true,
    };
    Chai.request(app)
      .post('/api/v1/Users/user')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('array');
        expect(newUser.id).to.be.equal(res.body.data[0].id);
        expect(newUser.email).to.be.equal(res.body.data[0].email);
        expect(newUser.first_name).to.be.equal(res.body.data[0].first_name);
        expect(newUser.last_name).to.be.equal(res.body.data[0].last_name);
        expect(newUser.password).to.be.equal(res.body.data[0].password);
        expect(newUser.is_admin).to.be.equal(res.body.data[0].is_admin);
        done();
      });
  });

  it('should return status code 400 if required fields are missing', (done) => {
    Chai.request(app)
      .post('/api/v1/Users/user')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').and.to.be.equals('Please fill in all the required fields');
        done();
      });
  });

  it('should get all cars', (done) => {
    Chai.request(app)
      .get('/api/v1/Users/user')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        done();
      });
  });
});
