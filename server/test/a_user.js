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

  it('should return status code 409 if user already exists', (done) => {
    const payload = {
      firstname: 'moses',
      lastname: 'ngabire',
      email: 'mose@gmail.com',
      password: 'moses123',
    };
    Chai.request(app)
      .post('/api/v1/auth/signup')
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('error').and.to.be.equals('User already exist');
        done();
      });
  });

  it('should return status code 400 if no data sent', (done) => {
    Chai.request(app)
      .post('/api/v1/auth/signup')
      .send({})
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('error').and.to.be.equals('Bad request. All fields are required');
        done();
      });
  });

  it('should return status code 200 if a user is logged in', (done) => {
    const payload = {
      email: 'mose@gmail.com',
      password: 'moses123',
    };

    Chai.request(app)
      .post('/api/v1/auth/signin')
      .send(payload)
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.statusCode).to.equal(200);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('token').to.be.a('string');
        expect(res.body).to.have.property('data').and.to.be.equals(payload.email);
        expect(res.body).to.have.property('message').and.to.be.equals('User logged in successfully');
        done();
      });
  });

  it('should return status code 401 if a user signed in with wrong username and password', (done) => {
    const payload = {
      email: '2355',
      password: '<<ds<s!:/',
    };

    Chai.request(app)
      .post('/api/v1/auth/signin')
      .send(payload)
      .end((err, res) => {
        expect(res.statusCode).to.equal(401);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('error').and.to.be.equals('Incorrect username or password');
        done();
      });
  });
});
