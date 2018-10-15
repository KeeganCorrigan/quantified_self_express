const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Food = require('./models/food')
const Meal = require('./models/meal')
const FoodsController = require('./controllers/foodsController')
const MealsController = require('./controllers/mealsController')


const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'quantified_self_express';

app.get('/api/v1/meals', (request, response) => {
  MealsController.index(request, response)
})

app.get('/api/v1/meals/:id', (request, response) => {
  MealsController.find(request, response)
})

app.get('/api/v1/foods', (request, response) => {
  FoodsController.index(request, response)
});

app.get('/api/v1/foods/:id', (request, response) => {
  FoodsController.show(request, response)
});

app.post('/api/v1/foods', (request, response) => {
  FoodsController.create(request, response)
});

app.delete('/api/v1/foods/:id', (request, response) => {
  FoodsController.delete(request, response)
});

app.put('/api/v1/foods/:id', (request, response) => {
  FoodsController.update(request, response)
});

module.exports = app;
