const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/register', userController.register);
router.get('/check-id', userController.checkId);
router.post('/login', userController.login);

module.exports = router;