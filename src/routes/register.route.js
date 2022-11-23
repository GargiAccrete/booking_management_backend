const express = require('express');
const registerController = require('../controllers/register.controller')
const router = express.Router();

//map api
router.get('/mapstate',registerController.listMapStateData);
router.get('/mapcity/:state_id',registerController.listCity);
router.get('/mapcity',registerController.listCity);

//register api
router.get('/list',registerController.list);
router.post('/insert',registerController.create);
router.get('/:id/view',registerController.viewById);
router.put('/:id/update',registerController.update);
router.get('/:id/delete',registerController.deleteById);

//dashboard api
// router.get('/dashboard',registerController.dashboard);


module.exports = router;