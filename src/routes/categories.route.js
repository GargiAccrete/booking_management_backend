const express = require('express');
const isAuthorised = require('../middlewares/isAuthorised.middleware');
const categoriesController = require('../controllers/categories.controller');

const router = express.Router();

router.get('/list', [isAuthorised], categoriesController.list);
router.post('/create', [isAuthorised], categoriesController.create);
router.get('/:id/view', [isAuthorised], categoriesController.viewById);
router.put('/:id/update', [isAuthorised], categoriesController.update);
router.delete('/:id/delete', [isAuthorised], categoriesController.deleteById);

module.exports = router;
