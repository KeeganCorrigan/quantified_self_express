exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('mealfoods', function(t) {
      t.increments();
      t.integer('meal_id').references('meals.id').onDelete('CASCADE');
      t.integer('food_id').references('foods.id').onDelete('CASCADE');
      t.timestamps();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('mealfoods')
  ])
};
