const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);
const Meal = require('./meal')
const Food = require('./food')

module.exports = class MealFoods {
  static create(request, response) {

    Meal.find(request.params.meal_id)
      .then((meal) => {
        if (meal.rows.length === 0) { return response.sendStatus(404) }
        Food.find(request.params.food_id)
        .then((food) => {
          if (food.length === 0) { return response.sendStatus(404) }
          database('mealfoods').insert( [{ meal_id: request.params.meal_id }, { food_id: request.params.food_id }]
           )
          response.status(200).json( { "message": `Successfully added ${food[0].name} to ${meal.rows[0].name}`} )
        })
      })
      .catch((error) => {
        response.status(500).json( { error} )
      })
  }
}
