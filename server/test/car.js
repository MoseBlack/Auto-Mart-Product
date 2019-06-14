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

  it('should return 200 to get all the cars', (done) => {
    Chai
      .request(app)
      .get('/api/v1/cars')
      .set({ Authorization: `${userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.a('number');
        // expect(res.body.data.owner).to.be.equals(payload.email);
        expect(res.body).to.have.property('data').to.be.an('array');
        // expect(res.body).to.have.property('message').and.to.be.equals('Car adv created successfully');
      });
    done();
  });
  it('should return 404 if no car found', (done) => {
    Chai
      .request(app)
      .get('/api/v1/cars')
      .set({ Authorization: `${userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.be.a('number');
        // expect(res.body).to.have.property('error').and.to.be.equals('No result yet');
      });
    done();
  });
  it('should return 200 if car price updated', (done) => {
    const payload = {
      price: 10000,
    };
    Chai
      .request(app)
      .patch('/api/v1/cars/1/price')
      .set({ Authorization: `${userToken}` })
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.a('number');
        // expect(res.body).to.have.property('error').and.to.be.equals('No result yet');
      });
    done();
  });

  it('should return 200 if car status updated', (done) => {
    const payload = {
      status: 'sold',
    };
    Chai
      .request(app)
      .patch('/api/v1/cars/1/status')
      .set({ Authorization: `${userToken}` })
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.a('number');
        // expect(res.body).to.have.property('error').and.to.be.equals('No result yet');
      });
    done();
  });

  it('should return 400 if no car found associated with the price', (done) => {
    const payload = {
      price: 10000,
    };
    Chai
      .request(app)
      // eslint-disable-next-line no-template-curly-in-string
      .patch('/api/v1/cars/`${id}`/price')
      .set({ Authorization: `${userToken}` })
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('error').and.to.be.equals('car not found');
      });
    done();
  });

  it('should return 400 if no car found associated with the status', (done) => {
    const payload = {
      status: 10000,
    };
    Chai
      .request(app)
      // eslint-disable-next-line no-template-curly-in-string
      .patch('/api/v1/cars/`${id}`/status')
      .set({ Authorization: `${userToken}` })
      .send(payload)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('error').and.to.be.equals('car not found');
      });
    done();
  });
  it('should return 404 if no car found to delete', (done) => {
    Chai
      .request(app)
      .delete('/api/v1/cars/1')
      .set({ Authorization: `${userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('error').and.to.be.equals('car not found');
      });
    done();
  });

  it('should return 404 if no car found to delete', (done) => {
    Chai
      .request(app)
      .delete('/api/v1/cars/1')
      .set({ Authorization: `${userToken}` })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.be.a('number');
        expect(res.body).to.have.property('message').and.to.be.equals('car successfully deleted');
      });
    done();
  });
});
