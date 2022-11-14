const express = require('express');
// const categoriesController = require('../controllers/categories.controller');
const restaurantController = require('../controllers/resturant.controller');
const router = express.Router();

router.get('/', [], registerController.list);
router.post('/register', [], registerController.create);
router.get('/:id/view', [], registerController.viewById);
router.put('/:id/update', [], registerController.update);
router.delete('/:id/delete', [], registerController.deleteById);


module.exports = router;