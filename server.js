const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const FoodsRoutes = require('./routes/food_routes')
const MealsRoutes = require('./routes/meals_routes')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('port', process.env.PORT || 3000)
app.locals.title = 'quantified_self_express'

app.use('/api/v1/foods', FoodsRoutes)
app.use('/api/v1/meals', MealsRoutes)

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})

module.exports = app
