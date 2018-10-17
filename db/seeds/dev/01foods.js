exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE foods RESTART IDENTITY CASCADE')
    .then(function () {
      return knex('foods').insert([
        {id: 5, name: 'apple', calories: 100},
        {id: 6, name: 'banana', calories: 90},
        {id: 7, name: 'Ham Sandwich', calories: 250},
        {id: 8, name: 'Chocolate bar', calories: 200}
      ]);
    });
};
