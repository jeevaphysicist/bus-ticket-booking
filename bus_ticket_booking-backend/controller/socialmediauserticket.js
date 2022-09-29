const socialmedia_user_ticket = require("../models/socialmediauserticketmodal");

exports.storedata = (req,res)=>{
    const {busNo,busName,passengerName,startCity,destinationCity,seatNo,date,Gender,cost,email,userid} = req.body;
    console.log(req.body);
    let put ={
        busNo:busNo,
        busName:busName,
        passengerName:passengerName,
        startCity:startCity,
        destinationCity:destinationCity,
        seatNo:seatNo,
        date:date,
        Gender:Gender,
        cost:cost,
        email:email,
        userid:userid
    }
    socialmedia_user_ticket.create(put).then(result=>{
        res.status(201).json({
            message:"API connected successfully",
            data:result
        })
    })
    .catch(err=>{
        res.status(505).json({
            message:"something went wrong",
            error:err
        })
    })
}

exports.gettickets =(req,res)=>{
    const {email,userid} = req.body;
    let filter = {
        email:email,
        userid:userid
    }
    socialmedia_user_ticket.find( filter).then((result)=>{
        res.status(200).json({
            message:"API connected successfully",
            data:result
        })
    })
    .catch(err=>{
        res.status(505).json({
            message:"something went wrong",
            error:err
        })
    })
}