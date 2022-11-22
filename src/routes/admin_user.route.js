const express = require('express');
const AdminUserController = require('../controllers/admin_user.controller');
const router = express.Router();



//AdminUser api
router.get('/list',AdminUserController.list);
router.post('/insert',AdminUserController.create);
router.get('/:id/view',AdminUserController.viewById);
router.put('/:id/update',AdminUserController.update);
router.get('/:id/delete',AdminUserController.deleteById);

//dashboard api
// router.get('/dashboard',registerController.dashboard);


module.exports = router;