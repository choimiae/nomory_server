const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const authToken = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.get('/check-id', authController.checkId);
router.post('/login', authController.login);
router.get('/verify', authToken , authController.verify);

module.exports = router;