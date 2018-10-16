const express = require('express');
const router = express.Router();
const FoodsController = require('../controllers/foodsController')
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

module.exports = router
