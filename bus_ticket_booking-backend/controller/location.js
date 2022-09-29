const Location = require("../models/AvailableCity");

exports.getlocation = (req,res)=>{
    const {city_id} = req.body;
    let filter ={city_id:city_id};
    Location.find(filter).then(result=>{
        res.status(200).json({
            message:"API is connected successfully",
            data:result
        })
       
        })
         .catch(err=>{
            res.status(200).json({
                message:"something went wrong in database",
                error:err
            })
    })
}

exports.getall =(req,res)=>{
    Location.find().then(result=>{
        res.status(200).json({
            message:"API is connected successfully",
            data:result
        })
       
        })
         .catch(err=>{
            res.status(505).json({
                message:"something went wrong in database",
                error:err
            })
    })

}