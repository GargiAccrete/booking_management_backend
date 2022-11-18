const express = require('express');
const registerController = require('../controllers/register.controller')
const router = express.Router();

//map api
router.get('/map',registerController.listMapData);

//register api
router.get('/list',registerController.list);
router.post('/insert',registerController.create);
router.get('/:id/view',registerController.viewById);
router.put('/:id/update',registerController.update);
router.get('/:id/delete',registerController.deleteById);

//dashboard api
// router.get('/dashboard',registerController.dashboard);


module.exports = router;