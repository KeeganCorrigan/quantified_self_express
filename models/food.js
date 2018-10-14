const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = class Food {
  static all() {
    return database('foods').select()
  }

  static find(id) {
    return database('foods').where('id', id).select()
  }

  static create(food) {
    return database('foods').insert(food, ['id'])
  }

  static delete(foodId) {
    return database('foods').where( { 'id': foodId} ).del()
  }
}
