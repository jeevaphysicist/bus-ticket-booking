const express = require("express");
const app_ticket_controller = require("../controller/appuserticket");
const socialmedia_ticket_controller =require("../controller/socialmediauserticket");

const router = express.Router();

// app user tickets routes
router.post("/appuserticket",app_ticket_controller.storedata);
router.post("/app/gettickets",app_ticket_controller.gettickets);



// social media user tickets routes
router.post("/socialticket",socialmedia_ticket_controller.storedata);
router.post("/social/gettickets",socialmedia_ticket_controller.gettickets);



module.exports = router;