exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('foods').insert([
        {id: 1, name: 'apple', calories: 100},
        {id: 2, name: 'banana', calories: 90},
        {id: 3, name: 'Ham Sandwich', calories: 250},
        {id: 4, name: 'Chocolate bar', calories: 200}
      ]);
    });
};
