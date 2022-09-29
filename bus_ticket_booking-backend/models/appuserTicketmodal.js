const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema({
    busName :{
        type:String,
        required:true
    },
    busNo :{
        type:String,
        required:true
    },
    passengerName :{
        type:Array,
        required:true
    },
    startCity :{
        type:String,
        required:true
    },
    destinationCity:{
        type:String,
        required:true
    },
     seatNo :{
        type:Array,
        required:true
    },
    Gender:{
        type:Array,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    cost:{
        type:Array,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model("app_user_ticket",ticketSchema,"App_user_ticket");