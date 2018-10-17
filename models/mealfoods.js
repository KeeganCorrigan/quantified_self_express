const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = class MealFood {
  static find(meal_id, food_id) {
    return database.raw
      (`
        SELECT meals.name AS meal_name, meals.id AS meals_id, foods.name AS food_name, foods.id AS foods_id, mealfoods.id AS mealfoods_id
        FROM meals
        JOIN mealfoods ON meals.id = mealfoods.meal_id
        JOIN foods ON mealfoods.food_id = foods.id
        WHERE foods.id = ${food_id} AND meals.id = ${meal_id}
      `)

  }

  static delete(id) {
    return database("mealfoods").del({ id: id })
  }
}
