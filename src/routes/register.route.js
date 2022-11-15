const express = require('express');
// const categoriesController = require('../controllers/categories.controller');
// const restaurantController = require('../controllers/resturant.controller');
const registerController = require('../controllers/register.controller')
const router = express.Router();

// router.get('/', [], registerController.list);
router.post('/insert', [], registerController.create);
// router.get('/:id/view', [], registerController.viewById);
// router.put('/:id/update', [], registerController.update);
// router.delete('/:id/delete', [], registerController.deleteById);
// console.log('hello 2');

module.exports = router;