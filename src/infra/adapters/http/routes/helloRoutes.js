const express = require('express');
const HelloController = require('../controllers/HelloController');

const router = express.Router();

router.post('/hello', HelloController.createHello);

module.exports = router;