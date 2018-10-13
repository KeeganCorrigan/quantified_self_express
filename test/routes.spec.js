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
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('apple');
        response.body[0].should.have.property('calories');
        response.body[0].calories.should.equal(100);
        done();
      });
    });
  });

  describe('GET /api/v1/foods/:id', () => {
    it('should return food with specified ID', done => {
      chai.request(server)
      .get('/api/v1/foods/1')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('name');
        response.body.should.have.property('calories');
        done();
      })
    })

    // it('should return 404 if food is not found', done => {
    //   chai.request(server)
    //   .get('api/v1/foods/21398')
    //   .end((err, response) => {
    //     response.should.have.status(404);
    //     done();
    //   })
    // })
  })

  // describe('PUT /api/v1/foods/:id', () => {
  //   it('should update an existing food', done => {
  //     chai.request(server)
  //       .put('/api/v1/foods/1')
  //       .send({
  //         calories: 86,
  //         name: 'apple'
  //       })
  //       .end((err, response) => {
  //         response.should.have.status(201)
  //
  //       })
  //   })
  // })

  describe('DELETE /api/v1/foods/:id', () => {
    it('should delete an existing food', done => {
      chai.request(server)
        .delete('/api/v1/foods/1')
        .end((err, response) => {
          response.should.have.status(204)
          chai.request(server)
          .get('/api/v1/foods')
          .end((err, response) => {
            response.body.length.should.equal(0)
            done();
        })
      })
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
            `Expected format: { name: <string>, calories: <integer> }. You are missing a "calories property."`
          );
          done();
      });
    });

    it('should not create a record with missing data', done => {
      chai.request(server)
        .post('/api/v1/foods')
        .send({
          calories: 200
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.equal(
            `Expected format: { name: <string>, calories: <integer> }. You are missing a "name property."`
          );
          done();
      });
    });
  });
});
