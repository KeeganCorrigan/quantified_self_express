const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'quantified_self_express';

app.get('/api/v1/foods', (request, response) => {
  database('foods').select()
    .then((foods) => {
      response.status(200).json(foods);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

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
  database('foods').where({ 'id': foodId}).del()
    .then((result) => {
      response.status(204).json({  })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});


module.exports = app;
