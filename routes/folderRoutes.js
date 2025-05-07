const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authMiddleware');
const folderController = require('../controller/folderController');

router.get('/', authToken, folderController.getFolder);
router.post('/', authToken, folderController.addFolder);
router.patch('/', authToken, folderController.updateFolder);
router.delete('/', authToken, folderController.deleteFolder);

module.exports = router;