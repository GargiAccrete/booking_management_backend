const express = require('express');
const isAuthorised = require('../middlewares/isAuthorised.middleware');
const barndController = require('../controllers/brand.controller');

const router = express.Router();

router.get('/list', barndController.list);
router.post('/insert', barndController.create);

module.exports = router;