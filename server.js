const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const FoodsController = require('./controllers/foodsController')
const MealsController = require('./controllers/mealsController')
const FoodRoutes = require('./routes/food_routes')
const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use('/api/v1/foods', FoodRoutes)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3000)
app.locals.title = 'quantified_self_express'

app.get('/api/v1/meals', MealsController.index)

app.get('/api/v1/meals/:id', MealsController.find)

app.get('/api/v1/foods', FoodsController.index)

app.get('/api/v1/foods/:id', FoodsController.show)

app.post('/api/v1/foods', FoodsController.create)

app.delete('/api/v1/foods/:id', FoodsController.delete)

app.put('/api/v1/foods/:id', FoodsController.update)

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
