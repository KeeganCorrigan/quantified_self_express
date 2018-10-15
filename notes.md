exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meal_foods RESTART IDENTITY CASCADE')
  .then(function () {
    return knex('meal_foods').insert([
      {meal_id: 1, food_id: 1},
      {meal_id: 1, food_id: 2},
      {meal_id: 2, food_id: 3},
      {meal_id: 2, food_id: 4},
    ]);
  })
}

In an attempt to seed mealfoods:

1. renaming files to 01, 02, 03 in case the order htey run in is important
2. changing the mealfoods to its own separate migration
3. Manually inserting in psql seems to work, but inserting via seed file DOES NOT.
4. Changed to raw to attempt to insert, to no effect.
5. attempting to change numbers to non-existent numbers.
6. Tried seeding only 1 file.

SOLUTION: Files are seeded alphabetically, add a z before final seeded file.

In an attempt to query just a meal with associated stuff:

1.     return database.raw
      (`
        SELECT meals.id, meals.name, array_to_json
        (array_agg(json_build_object('id', foods.id, 'name', foods.name, 'calories', foods.calories)))
        AS foods
        FROM meals
        JOIN mealfoods ON meals.id = mealfoods.meal_id
        JOIN foods ON mealfoods.food_id = foods.id
        GROUP BY meals.id`
      ).where('id', id)

      .where can not be appended to raw
2. 
