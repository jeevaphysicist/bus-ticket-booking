const express = require('express');
const mongoose =require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const busroute = require('./routes/busroutes');
const useroutes = require('./routes/userloginroutes');
const paymentroutes = require('./routes/paymentroutes');
const ticketroutes = require('./routes/Ticketroutes');
const locationroutes = require('./routes/locationroutes');

const port = 9090;
 const mongoURI = "mongodb://localhost:27017/busbooking";
  // const mongoURI = `mongodb+srv://devil:2001@clustor1.mblkznx.mongodb.net/Bus_ticket_booking`
mongoose.connect(mongoURI,()=>console.log("Database connected successfully"),e=>console.log(" database connection error ",e));

const app = express();
app.use(cors());
app.use(bodyParser.json());


//middle wares
app.use('/',busroute);
app.use("/userdata",useroutes);
app.use("/payment",paymentroutes);
app.use("/tickets",ticketroutes);
app.use("/location",locationroutes);


app.listen(port,()=>{
    console.log("server running upon port :",port);
})
