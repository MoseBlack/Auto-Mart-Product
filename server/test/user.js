const Chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

Chai.use(chaiHttp);
const { expect } = Chai;
describe('User Authentification', () => {
  it('should return status code 201 for a newly created object', (done) => {
    const newUser = {
      id: 1,
      token: '45erkjherht45495783',
      email: 'user_1@gmail.com',
      first_name: 'Koby',
      last_name: 'Bryant',
      password: 'losangeles123',
      address: 'Lakers',
      is_admin: true,
    };
    Chai.request(app)
      .post('/api/v1/users/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.data).to.be.a('array');
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
      .post('/api/v1/users/auth/signup')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').and.to.be.equals('Please fill in all the required fields');
        done();
      });
  });

  it('should return status code 200 if a user logs in successfully', (done) => {
    const newUser = {
      id: 1,
      token: '45erkjherht45495783',
      email: 'user_1@gmail.com',
      password: 'losangeles123',
    };
    Chai.request(app)
      .post('/api/v1/users/auth/signin')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.data).to.be.a('object');
        expect(newUser.id).to.be.equal(res.body.data.id);
        expect(newUser.token).to.be.equal(res.body.data.token);
        expect(newUser.email).to.be.equal(res.body.data.email);
        expect(newUser.password).to.be.equal(res.body.data.password);
        done();
      });
  });

  it('should return status code 404 if a user login credentials are false', (done) => {
    const newUser = {
      id: 5,
      token: '45erkjherht3',
      email: 'use@gmail.com',
      password: 'losangeles',
    };

    Chai.request(app)
      .post('/api/v1/users/auth/signin')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error').and.to.be.equals('user not found');
        done();
      });
  });
});
// it('should get all cars', (done) => {
//   Chai.request(app)
//     .get('/api/v1/cars')
//     .end((err, res) => {
//       expect(res).to.have.status(200);
//       expect(res.body).to.be.a('object');
//       done();
//     });
// });
