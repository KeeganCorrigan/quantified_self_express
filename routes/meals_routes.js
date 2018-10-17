const express = require('express');
const router = express.Router();
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

const MealsController = require('../controllers/mealsController')
const MealFoodsController = require('../controllers/mealFoodsController')


router.get('/', MealsController.index)

router.get('/:id', MealsController.find)

router.post('/:meal_id/foods/:food_id', MealFoodsController.create)

router.delete('/:meal_id/foods/:food_id', MealFoodsController.delete)


module.exports = router
