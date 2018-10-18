const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

const Meal = require('../models/meal')

module.exports = class mealsController {
  static async index(request, response) {
    try {
      const meals = await Meal.all();

      response.status(200).json(meals.rows)
    } catch (error) {
      response.status(500).json({ error });
    }
  }

  static async find(request, response) {
    try {
      const meal = await Meal.find(request.params.id)
      if (meal.rows.length == 0) { return response.sendStatus(404) }

      response.status(200).json(meal.rows[0])
    } catch (error) {
        response.status(500).json({ error })
    }
  }
}
