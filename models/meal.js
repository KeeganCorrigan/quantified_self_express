const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = class Meal {
  static all() {
    return database.raw
      (`
        SELECT meals.id, meals.name, array_to_json
        (array_agg(json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories)))
        AS foods
        FROM meals
        JOIN mealfoods ON meals.id = mealfoods.meal_id
        JOIN foods ON mealfoods.food_id = foods.id
        GROUP BY meals.id
        ORDER BY meals.id ASC
      `)
  }

  static find(id) {
    return database.raw
      (`
        SELECT meals.id, meals.name, array_to_json
        (array_agg(json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories)))
        AS foods
        FROM meals
        JOIN mealfoods ON meals.id = mealfoods.meal_id
        JOIN foods ON mealfoods.food_id = foods.id
        WHERE meals.id = ${id}
        GROUP BY meals.id
      `)
  }
}
