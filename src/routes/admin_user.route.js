const express = require('express');
const AdminUserController = require('../controllers/admin_user.controller');
const isAuth = require('../middlewares/isAuth.middleware');
const router = express.Router();

//map api
router.get('/mapstate',AdminUserController.listMapStateData);
router.get('/mapcity/:state_id',AdminUserController.listCity);
router.get('/mapcity',AdminUserController.listCity);

// router.post('/login', AdminUserController.login);
// router.get('/logout', AdminUserController.logout);

//AdminUser api
router.get('/list',AdminUserController.list);
router.post('/insert',AdminUserController.create);
router.get('/:id/view',AdminUserController.viewById);
router.put('/:id/update',AdminUserController.update);
router.get('/:id/delete',AdminUserController.deleteById);

//dashboard api
// router.get('/dashboard',registerController.dashboard);


module.exports = router;