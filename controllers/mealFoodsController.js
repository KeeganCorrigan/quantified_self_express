const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

const database = require('knex')(configuration);
const Meal = require('../models/meal')
const Food = require('../models/food')
const MealFoods = require('../models/mealfoods')

module.exports = class MealFoodsController {
  static async create(request, response) {
    try {
      const foodId = request.params.food_id
      const mealId = request.params.meal_id

      const food = await Food.find(foodId)
      if (food.length === 0) { return response.sendStatus(404) }

      const meal = await Meal.find(mealId)
      if (meal.rows.length === 0) { return response.sendStatus(404) }

      const createdFood = await MealFoods.create(foodId, mealId)

      response.status(201).json( {"message": `Successfully added ${food[0].name} to ${meal.rows[0].name}`} )
    } catch(error) {
      response.status(500).json({ error })
    }
  }

  static async delete(request, response) {
    try {
      const foodId = request.params.food_id
      const mealId = request.params.meal_id

      const food = await Food.find(foodId)
      if (food.length === 0) { return response.sendStatus(404) }

      const meal = await Meal.find(mealId)
      if (meal.rows.length === 0) { return response.sendStatus(404) }

      const mealfood = await database("mealfoods").where({food_id: foodId}).where({meal_id: mealId})

      const deleted = await MealFoods.delete(mealfood[0].id)

      response.json( {"message": `Successfully removed ${food[0].name} from ${meal.rows[0].name}`} )

    } catch(error) {
      response.status(500).json({ error })
    }
  }
}
