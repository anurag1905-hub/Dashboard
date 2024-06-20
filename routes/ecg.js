const express = require('express');
const router = express.Router();
const ecgController = require('../controllers/ecgController');

router.get('/',ecgController.home);
router.post('/storelstm512data',ecgController.storeLSTM512);
router.post('/storelstm1024data',ecgController.storeLSTM1024);
router.post('/storelstm2048data',ecgController.storeLSTM2048);
router.post('/transferlearningdata',ecgController.storeTL);
router.post('/heartratedata',ecgController.storeheartData);

module.exports = router;