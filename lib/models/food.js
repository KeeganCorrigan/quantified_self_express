const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

module.exports = class Food {
  static all () {
    return database('foods').select()
  }
}
