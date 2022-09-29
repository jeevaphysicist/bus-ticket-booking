const busdata = require("../models/busmodel");

exports.getbusdata = (req,res)=>{
    busdata.find().then(result=>{
        res.status(200).json({
            message:"Api is connected successfully",
            data:result
        });

    })
    .catch(err=>{
        res.status(505).json({
            message:"something went wrong",
            error:err
        })
    })

}

exports.getrequiredbus = (req,res)=>{
    const {sourceCity,destinationCity,date,busType,lcost,hcost,busSeattype}=req.body;
    let filter={startCity :sourceCity,
                destination:destinationCity,
                date:date
              }

            

            //   bus Type
              if(busType && busType.length > 0)
              {            
                filter["busType.name"]={$in:busType}
              }

            //   cost filter
              if(lcost && hcost)
              {
                  filter.pricePerSeat = {$lte: hcost,$gt:lcost};
              }
             
              else{
                  if(lcost == 0)
                  if(hcost){
                      filter.pricePerSeat ={$lte :hcost}
                      } 
              }


              if(busSeattype == "single"){
                filter.busSeattype = busSeattype;

              }


              console.log("filter :" ,filter);
      









    busdata.find(filter).then(result=>{
        res.status(200).json({
            message:"Api is connected successfully",
            data:result
        });

    })
    .catch(err=>{
        res.status(505).json({
            message:"something went wrong",
            error:err
        })
    })

}

exports.getbusdetails =(req,res)=>{
    const {id} =req.body;
    console.log("id:",id);
    let filter ={_id:id};
    busdata.find(filter).then(result=>{
        res.status(200).json({
            message:"API is connected successfully",
            data:result
        })
      })
      .catch(err=>{
        res.status(505).json({
            message:"API connected failed",
            error:err
        })
    })
}

exports.updateseats =(req,res)=>{
    console.log("req",req.body);
    
    const {ReservedSeats,startCity,destination,CompanyName,date} = req.body; 
    let totalseats = 30 - ReservedSeats.length;   
    let query = {
        startCity:startCity,
        destination:destination,
        CompanyName:CompanyName,
        date:date
    }
    
    let newvalues= {$set:{notAvailable:ReservedSeats,availableSeats:totalseats}}
     
    
  busdata.updateOne(query,newvalues).then(result=>{
    res.status(202).json({
        message:"API is Connected SUCCESSFULY",
        data : result
    })
  })
  .catch(err=>{
    res.status(505).json({
        message:"something went wrong",
        Error:err
    })
  })
   
}