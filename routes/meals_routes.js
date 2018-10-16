const express = require('express');
const router = express.Router();
const MealsController = require('../controllers/mealsController')
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
