const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const ecgController = require('../controllers/ecgController');

router.get('/',homeController.home);
router.post('/storeData',homeController.saveData);
router.get('/refreshData',homeController.refreshData);
router.use('/ecg',require('./ecg'));


module.exports = router;