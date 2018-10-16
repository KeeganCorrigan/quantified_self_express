const express = require('express');
const router = express.Router();
const MealsController = require('../controllers/mealsController')
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

// router.get('/api/v1/meals', MealsController.index)

module.exports = router
