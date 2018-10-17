exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealfoods RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('mealfoods').insert([
        {meal_id: 1, food_id: 5},
        {meal_id: 1, food_id: 6},
        {meal_id: 2, food_id: 7},
        {meal_id: 2, food_id: 8},
        {meal_id: 3, food_id: 7},
        {meal_id: 3, food_id: 8},
        {meal_id: 4, food_id: 7},
        {meal_id: 4, food_id: 8},
      ]);
  })
}
