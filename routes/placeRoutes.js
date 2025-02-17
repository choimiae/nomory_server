const express = require('express');
const router = express.Router();
const placeController = require('../controller/placeController');

router.get('/', placeController.getPlace);
router.post('/', placeController.addPlace);
router.patch('/', placeController.updatePlace);
router.delete('/', placeController.deletePlace);

module.exports = router;