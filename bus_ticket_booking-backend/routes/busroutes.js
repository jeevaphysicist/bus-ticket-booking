const express = require('express');
const buscontroller = require('../controller/buscontroller');

const router = express.Router();

router.get("/",buscontroller.getbusdata);
router.post("/bus",buscontroller.getrequiredbus);
router.post("/busdetails",buscontroller.getbusdetails);
router.put("/seatupdate",buscontroller.updateseats);


module.exports = router;