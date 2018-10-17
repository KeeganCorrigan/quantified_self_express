const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

const database = require('knex')(configuration);
const Meal = require('../models/meal')
const Food = require('../models/food')
const MealFoods = require('../models/mealfoods')

module.exports = class MealFoodsController {
  static create(request, response) {
    database("mealfoods").insert({food_id: request.params.food_id, meal_id: request.params.meal_id}, 'id')
      .then((data) => {
        response.status(201).json( {"message": `Successfully added food to meal`} )
      })
    }
    // Meal.find(request.params.meal_id)
    //   .then((meal) => {
    //     if (meal.rows.length === 0) { return response.sendStatus(404) }
    //     Food.find(request.params.food_id)
    //     .then((food) => {
    //       if (food.length === 0) { return response.sendStatus(404) }
    //       database('mealfoods').insert( [{ meal_id: request.params.meal_id }, { food_id: request.params.food_id }]
    //        )
    //       response.status(201).json( {"message": `Successfully added ${food[0].name} to ${meal.rows[0].name}`} )
    //     })
    //   })
    //   .catch((error) => {
    //     response.status(500).json( { error } )
    //   })

  static delete(request, response) {
    database("mealfoods").where({food_id: request.params.food_id}).where({meal_id: request.params.meal_id}).del().returning("*")
      .then((data) => {
        response.send( { message: `Successfully removed food`} )
      })
    }

    //   MealFoods.find(request.params.meal_id, request.params.food_id)
    //     .then((data) => {
    //       if (data.rows.length === 0) { return response.sendStatus(404) }
    //       MealFoods.delete(data.rows[0].mealfoods_id).returning("*")
    //       .then((food) => {
    //         response.send( { message: `Successfully removed ${data.rows[0].food_name} from ${data.rows[0].meal_name}` } )
    //       })
    //     })
    //     .catch((error) => {
    //       response.status(500).json( { error } )
    //     })
    // }
}
