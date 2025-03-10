const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.get('/', userController.getPlace);
router.post('/', userController.addPlace);
router.patch('/', userController.updatePlace);
router.delete('/', userController.deletePlace);

module.exports = router;