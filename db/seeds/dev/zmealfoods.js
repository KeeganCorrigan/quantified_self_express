exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealfoods RESTART IDENTITY CASCADE')
  .then(function () {
    return knex('mealfoods').insert([
      {meal_id: 1, food_id: 1},
      {meal_id: 1, food_id: 2},
      {meal_id: 2, food_id: 3},
      {meal_id: 2, food_id: 4},
    ]);
  })
}
