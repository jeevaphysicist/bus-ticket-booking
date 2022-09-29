const mongoose =require('mongoose');
const Schema = mongoose.Schema({
    city_id:{
        type:Number,
        required:true
    },
    Startcitylocation:{
        type:String,
        required:true
    },
    destinationcitylocation:{
        type:Array,
        required:true
    },
    startCity:{
        type:Array,
        required:true
    }
});


module.exports = mongoose.model("Location",Schema,"Location")