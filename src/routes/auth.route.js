const express = require('express');
const authController = require('../controllers/auth.controller');
const isAuthorised = require('../middlewares/isAuthorised.middleware');

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/reset-password', authController.resetPassword);
router.post('/forgot-password', authController.forgotPassword);
router.post('/change-password', [isAuthorised], authController.changePassword);

module.exports = router;
