const locationcontroll = require('../controller/location');
const express = require('express');

const router = express.Router();

router.post("/",locationcontroll.getlocation);
router.get("/all",locationcontroll.getall);

module.exports = router;