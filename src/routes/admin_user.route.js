const express = require('express');
const AdminUserController = require('../controllers/admin_user.controller');
const isAuth = require('../middlewares/isAuth.middleware');
const router = express.Router();

//adminUser api

router.get('/list',AdminUserController.list);
router.post('/insert',AdminUserController.create);
router.get('/:id/view',AdminUserController.viewById);
router.put('/:id/update',AdminUserController.update);
router.get('/:id/delete',AdminUserController.deleteById);


module.exports = router;