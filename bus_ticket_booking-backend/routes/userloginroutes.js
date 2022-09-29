const usercontroll = require('../controller/Users');
const socialmediacontrolller =require("../controller/socialmediauser");
const express = require('express');

const router = express.Router();


router.post('/signup',usercontroll.SignUp);
router.post('/login',usercontroll.Login);
router.post('/socialSignUp',socialmediacontrolller.socilMediaSignUp);
router.post('/socialLogin',socialmediacontrolller.socilMediaLogin);



module.exports = router;