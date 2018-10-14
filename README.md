# quantified_self_express:

Quantified Self Express is a restful express API.

### Technologies:

* Node 8.12.0
* Express 4.16.4
* Knex 0.15.2

### Routes

`GET /api/v1/foods`

returns a list of all foods in the database.

`GET /api/v1/food/:id`

returns a specific food from the database. Returns 404 if food can not be found.

`POST /api/v1/foods`

Adds a new food to the database. Post requests must be made in the following format: `{ name: "Name of food here", calories: "Calories here"} }`.

`DELETE /api/v1/foods/:id`

removes a food from the database.

`PUT /api/v1/foods/:id`

Updates the food name or the calorie amount. Put requests must be made in the following format: `{ food: { name: "Name of food here", calories: "Calories here"} }`

### Other notes:

Created by [Matt Bricker](https://github.com/brickstar) and [Keegan Corrigan](https://github.com/keegancorrigan/)
