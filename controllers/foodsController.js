const bodyParser = require('body-parser');
const Food = require('../models/food')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = class FoodsController {
  static index(request, response) {
    Food.all()
      .then((foods) => {
        response.status(200).json(foods);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  }

  static show(request, response) {
    Food.find(request.params.id)
      .then((food) => {
        if (food.length == 0) { return response.sendStatus(404) }
        response.status(200).json(food[0]);
      })
      .catch((error) => {
        response.status(500).json( { error } );
      });
  }

  static create(request, response) {
    const food = request.body;

    for (let requiredParameter of ['name', 'calories']) {
      if (!food[requiredParameter]) {
        return response.status(422).send({
          error: `Expected format: { name: <string>, calories: <integer> }. You are missing a "${requiredParameter} property."`
        })
      }
    }

    Food.create(food)
      .then(food => {
        response.status(201).json({ id: food[0] })
      })
      .catch(error => {
        response.status(500).json({ error })
      })
  }

  static delete(request,response) {
    const foodId = request.params.id

    Food.delete(foodId)
      .then(result => {
        return response.sendStatus(204)
      })
  }
}
