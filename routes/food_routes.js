const express = require('express');
const router = express.Router();
const FoodsController = require('../controllers/foodsController')
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

router.get('/', FoodsController.index)

router.get('/:id', FoodsController.show)

router.post('/', FoodsController.create)

router.put('/:id', FoodsController.update)

router.delete('/:id', FoodsController.delete)

module.exports = router
