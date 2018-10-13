const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

  beforeEach((done) => {
    database.seed.run()
    .then(() => done())
    .catch(error => {
      throw error;
    });
  });

  describe('GET /api/v1/foods', () => {
    it('should return all of the foods', done => {
      chai.request(server)
      .get('/api/v1/foods')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('apple');
        response.body[0].should.have.property('calories');
        response.body[0].calories.should.equal(100);
        done();
      });
    });
  });

  describe('POST /api/v1/foods', () => {
    it('should create a new food', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          name: 'oranges',
          calories: 200
        })
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('id');
          done();
      });
    });

    it('should not create a record with missing data', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          name: 'oranges'
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal(
            `Expected format: { name: <string>, calories: <integer> }. You're missing "integer" property.`
          );
          done();
      });
    });
  });
});
