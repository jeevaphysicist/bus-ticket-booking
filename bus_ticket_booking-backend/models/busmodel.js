const mongoose = require('mongoose');
const busdetailsSchema = mongoose.Schema({
    CompanyName :{
        type:String,
        required:true
    },
    busType :{
        type:Array,
        required:true
    },
    busNumber :{
        type:String,
        required:true
    },
    startCity :{
        type:String,
        required:true
    },
    destination :{
        type:String,
        required:true
    },
    totalSeats :{
        type:String,
        required:true
    },
    availableSeats:{
        type:String,
        required:true
    },
    date :{
        type:String,
        required:true
    },
    pricePerSeat :{
        type:Number,
        required:true
    },
    busSeattype:{
        type:String,
        required:true
    },
    notAvailable:{
        type:Array,
        required:true
    }
});


module.exports = mongoose.model("busdata",busdetailsSchema,"Busdata");