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


  static delete(request, response) {
    return database("mealfoods").where({food_id: request.params.food_id}).where({meal_id: request.params.meal_id})
      .then((data) => {
        database("mealfoods").where({ id: data[0].id }).del()
          .then((data) => {
            response.send( { message: `Successfully removed food`} )
          })
        })
    }

}
