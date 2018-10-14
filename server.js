const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Food = require('./models/food')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'quantified_self_express';

app.get('/api/v1/foods', (request, response) => {
  Food.all()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/foods/:id', (request, response) => {
  database('foods').where('id', request.params.id).select()
    .then((food) => {
      if (food.length == 0) { return response.sendStatus(404) }
      response.status(200).json(food[0]);
    })
    .catch((error) => {
      response.status(500).json( { error } );
    });
})

app.post('/api/v1/foods', (request, response) => {
  const food = request.body;
  for (let requiredParameter of ['name', 'calories']) {
    if (!food[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { name: <string>, calories: <integer> }. You are missing a "${requiredParameter} property."`
      })
    }
  }
  database('foods').insert(food, ['id'])
    .then(food => {
      response.status(201).json({ id: food[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.delete('/api/v1/foods/:id', (request, response) => {
  const foodId = request.params.id
  database('foods').where({ 'id': foodId }).del()
    .then(result => {
      return response.sendStatus(204)
    })
});


module.exports = app;
