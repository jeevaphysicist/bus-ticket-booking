const express = require('express');
const paymentroutes =require('../controller/payment')

const route = express.Router();

route.post('/',paymentroutes.createoreder);

route.post('/savetransaction',paymentroutes.saveTransaction)

module.exports= route;