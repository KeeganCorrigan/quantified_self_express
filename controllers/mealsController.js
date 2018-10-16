const bodyParser = require('body-parser');
const Meal = require('../models/meal')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = class mealsController {
  static index (request, response) {
    Meal.all()
      .then((meals) => {
        response.status(200).json(meals.rows);
      })
      .catch((error) => {
        response.status(500).json({ error });
      });
  }

  static find(request, response) {
    Meal.find(request.params.id)
      .then((meal) => {
        response.status(200).json(meal.rows[0])
      })
      .catch((error) => {
        response.status(500).json({ error })
      })
  }
}
