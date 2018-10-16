const express = require('express');
const router = express.Router();
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

const MealsController = require('../controllers/mealsController')

router.get('/', MealsController.index)

router.get('/:id', MealsController.find)

module.exports = router
