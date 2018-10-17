exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('meals').insert([
        {id: 1, name: 'Breakfast'},
        {id: 3, name: 'Snack'},
        {id: 2, name: 'Lunch'},
        {id: 4, name: 'Dinner'}
      ]);
    });
};
