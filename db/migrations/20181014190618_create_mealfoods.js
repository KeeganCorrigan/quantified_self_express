exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mealfoods', function(t) {
      t.increments('id').primary();
      t.integer('meal_id').references('meals.id')
      t.integer('food_id').references('foods.id')
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mealfoods')
  ])
};
