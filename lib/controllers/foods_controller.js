const Food = require('../models/food')

module.exports = class foodsController {
  static index (request, response) {
    Food.all()
      .then((foods) => {
        response.status(200).json(foods)
      })
      .catch((error) => {
        response.status(500).json({ error })
      })
  }
}
