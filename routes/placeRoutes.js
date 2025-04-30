const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authMiddleware');
const placeController = require('../controller/placeController');

router.get('/', authToken, placeController.getPlace);
router.post('/', authToken, placeController.addPlace);
router.patch('/', authToken, placeController.updatePlace);
router.delete('/', authToken, placeController.deletePlace);

module.exports = router;