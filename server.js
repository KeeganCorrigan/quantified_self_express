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

// const router = express.Router();

// router.get('/', footnotesController.index);

// const footnotes = require('./lib/routes/api/v1/footnotes')
// app.use('/api/v1/footnotes', footnotes)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'quantified_self_express';

app.get('/api/v1/meals', MealsController.index)

app.get('/api/v1/meals/:id', MealsController.find)

app.get('/api/v1/foods', FoodsController.index)

app.get('/api/v1/foods/:id', FoodsController.show)

app.post('/api/v1/foods', FoodsController.create)

app.delete('/api/v1/foods/:id', FoodsController.delete)

app.put('/api/v1/foods/:id', FoodsController.update)

module.exports = app;
