const bodyParser = require('body-parser')
const Food = require('../models/food')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

module.exports = class FoodsController {
  static async index (request, response) {
    try {
      const foods = await Food.all()
      response.status(200).json(foods)
    } catch(error) {
      response.status(500).json({ error })
    }
  }

  static async show (request, response) {
    try {
      const food = await Food.find(request.params.id)
      if (food.length === 0) { return response.sendStatus(404) }
      response.status(200).json(food[0])
    } catch(error) {
      response.status(500).json({ error })
    }

  }

  static create (request, response) {
    const food = request.body.food

    for (let requiredParameter of ['name', 'calories']) {
      if (!food[requiredParameter]) {
        return response.status(422).send({
          error: `Expected format: { name: <string>, calories: <integer> }. You are missing a "${requiredParameter} property."`
        })
      }
    }

    Food.create(food)
      .then(data => {
        response.status(201).json(data[0])
      })
      .catch(error => {
        response.status(500).json({ error })
      })
  }

  static update (request, response) {
    Food.update(request.params.id, request)
      .then((food) => {
        response.status(201).json(food[0])
      })

      .catch((error) => {
        response.status(500).json({ error })
      })
  }

  static delete (request, response) {
    const foodId = request.params.id

    Food.delete(foodId)
      .then(result => {
        return response.sendStatus(204)
      })
  }
}
