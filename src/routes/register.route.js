const express = require('express');
// const categoriesController = require('../controllers/categories.controller');
// const restaurantController = require('../controllers/resturant.controller');
const registerController = require('../controllers/register.controller')
const router = express.Router();

// router.get('/', [], registerController.list);
router.get('/user_list',[],registerController.list);
router.post('/insert', [], registerController.create);
router.get('list/:id', [], registerController.viewById);
router.put('list/:id/update', [], registerController.update);
router.delete('/:id/delete', [], registerController.deleteById);

module.exports = router;