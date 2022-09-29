import React,{useEffect,useState} from 'react';
import {useParams,useNavigate} from "react-router-dom";
import Header from './Header';
import "../Styles/Transaction.css";

export default function Transaction() {
  const [totalprice,setTotalprice] = useState(0);
  const [checktransaction,setChecktransaction] = useState(false);
  const navigate = useNavigate();
  let log;
  let userlogindata = localStorage.getItem("user");
  if(userlogindata != undefined){
    log=false;
  }
  else{
    log=true;
  }
  const [loginmodal,setLoginmodal]=useState(log);
  const [oldreservedseats,setOldreservedsets] = useState([]);
  const [busdata,setBusdata] =useState("");
  const [cost,setCost] = useState([])
    const {seatprice,id}=useParams();

   userlogindata = JSON.parse(userlogindata);
      

  
  

  let nameData = localStorage.getItem("nameData");
  let reservedSeats = localStorage.getItem('reservedSeats');
  let Gender = localStorage.getItem('passengerGender')

  nameData = JSON.parse(nameData);
  reservedSeats =JSON.parse(reservedSeats);
  Gender = JSON.parse(Gender);
 
  
 
  
  

  useEffect(()=>{
    let totalprices;
       totalprices= nameData.length * seatprice; 
       setTotalprice(totalprices);
       for(var i=0 ;i<nameData.length;i++){
        let set = seatprice;
           cost.push(set);
    }
    console.log("cost :",cost);


       fetch(`http://localhost:9090/busdetails`,{method:"POST",
        headers : {"Content-Type":"application/json"},
        body:JSON.stringify({id})
      })
       .then(res=>res.json())
       .then(result=>{
        console.log("result :",result);
        setOldreservedsets(result.data[0].notAvailable);
        setBusdata(result.data[0]);
       })

  },[]);

console.log('oldreservedseats',oldreservedseats);

  const handlepayment = ()=>{
    if(userlogindata != undefined && userlogindata.length >0){
      loadscript('https://checkout.razorpay.com/v1/checkout.js');
    }
    else{
      setLoginmodal(true);
    }
 
  }

  const loadscript = (rzscript)=>{
    return new Promise((resolve)=>{
      let script =document.createElement('script');
      script.src = rzscript;
      script.onload = ()=>{
                          openrazerpay(); 
                          resolve(true)
                          }
      script.onerror=()=>{
                         resolve(false)
                         }
     document.body.appendChild(script);
     });
  }
  
  
  
  const openrazerpay = async()=>{

    try{
       let orderData;
       orderData = await fetch(`http://localhost:9090/payment`,{method:'POST',
       headers :{'Content-Type' : 'application/json'},
       body:JSON.stringify({amount:totalprice}) })
       .then(response=>response.json());

    const options={
                  key :"rzp_test_BsGSW4LpkffpL9",
                  amount: orderData.amount,
                  order_id: orderData.id,
                  curreny:orderData.curreny,
                  name : "BUS Ticket Booking APP ",

                  prefill:{
                          email:"history@gmail.com",
                          contact:"677-875-9456"
                          },
                  handler:function(response){
                    console.log('response : ',response.razorpay_order_id);
                    fetch("http://localhost:9090/payment/savetransaction",{method:'POST',
                                                                  headers:{"Content-Type":"application/json"},
                                                                   body:JSON.stringify({
                                                                    razorpay_orderid: response.razorpay_order_id,
                                                                    razorpay_paymentid : response.razorpay_payment_id,
                                                                    razorpay_signature: response.razorpay_signature ,
                                                                   razorpay_amount:orderData.amount                            
                                                                  })
                                                                }).then(response=>response.json())
                                                                 .then(data=>{console.log("Data",data);
                                                                 if(data != undefined){
                                                                  let ReservedSeats = oldreservedseats.concat(reservedSeats);
                                                                  console.log("Reserved seats",ReservedSeats);
                                                                   let req ={
                                                                    ReservedSeats:ReservedSeats,
                                                                    startCity : busdata.startCity,
                                                                    destination:busdata.destination,
                                                                    CompanyName: busdata.CompanyName,
                                                                    date:busdata.date
                                                                   }
                                                                  fetch("http://localhost:9090/seatupdate",{method:"PUT",
                                                                  headers:{"Content-Type":"application/json"},
                                                                  body: JSON.stringify(req)
                                                                }).then(res=>res.json())
                                                                  .then(result=>{
                                                                    console.log("reserved seats : ",result);
                                                                    
                                                                    if(userlogindata != undefined){
                                                                      if(userlogindata[0].password != undefined){
                                                                        let req= {
                                                                          busNo:busdata.busNumber,
                                                                          busName:busdata.CompanyName,
                                                                          passengerName:nameData,
                                                                          startCity:busdata.startCity,
                                                                          destinationCity:busdata.destination,
                                                                           seatNo:reservedSeats,
                                                                          date:busdata.date,
                                                                          Gender:Gender,
                                                                          cost:cost,
                                                                          email:userlogindata[0].email,
                                                                          password:userlogindata[0].password,
                                                                      }
                                                                     fetch("http://localhost:9090/tickets/appuserticket",{method:"POST",
                                                                      headers:{"Content-Type":"application/json"},                                                                   
                                                                      body:JSON.stringify(req)
                                                                     }).then(response=>response.json())
                                                                     .then(result=>{
                                                                      console.log("ticket data :",result)
                                                                     })
                                                                      }
                                                                      else{
                                                                        let req= {
                                                                          busNo:busdata.busNumber,
                                                                          busName:busdata.CompanyName,
                                                                          passengerName:nameData,
                                                                          startCity:busdata.startCity,
                                                                          destinationCity:busdata.destination,
                                                                         seatNo:reservedSeats,
                                                                          date:busdata.date,
                                                                          Gender:Gender,
                                                                          cost:cost,
                                                                          email:userlogindata[0].email,
                                                                          userid:userlogindata[0].userId,
                                                                      }
                                                                        fetch("http://localhost:9090/tickets/socialticket",{
                                                                      method:"POST",
                                                                      headers:{"Content-Type":"application/json"},
                                                                      body:JSON.stringify(req)
                                                                     }).then(response=>response.json())
                                                                     .then(result=>{
                                                                      console.log("ticket data :",result)
                                                                     })
                                                                      }
                                                                    }
                                                                    
                                                                    if(totalprice == data.data.Transaction_amount/100){
                                                                      console.log("your ticket is ready");
                                                                       setChecktransaction(true);
                                                                    }
                                                                  })
                                                                  

                                                                  
                                                                 }
                                                                
                                                                });
                                                                
                  }}
    const paymentWindow = new window.Razorpay(options);
    paymentWindow.open()
    }
    catch(error){
                console.log(error);
                }

  }
   console.log("loginmodal",loginmodal);


  return (
    <React.Fragment>
      {
        checktransaction == true ? <div>
          {
            navigate("/home")
          }
        </div>
        :
        <div className='transactionback'>
        <Header login={loginmodal}/>
      <div className='container row'>
      <div className='tic'>Ticket Details</div>

        <div className=" col-12  ">
          {
          (nameData.length > 0 && nameData != undefined) ?  nameData.map((items,index)=><div className='tictic container card my-3' key={index}>
          <div>Seat No:{reservedSeats[index]}  </div>
          <div>passenger:{items}</div>
          <div>Gender : {Gender[index]}</div>
          <div>Cost of the Ticket : &#8377; {seatprice}</div>
        </div>
          )         
          :
            ""
          }
          
        </div> 

      </div>
     <div className='container' style={{fontWeight:"bolder",fontSize:"20px",color:"white"}}>
     <em> Total Price :</em><u>&#8377; {totalprice}</u><br/><br/>
      <div>
      <button className='btn btn-block btn-danger mb-4' onClick={()=>handlepayment()} >Pay Now </button>
      </div>
      
      
    </div> 

    </div>

      }
      
    </React.Fragment>
  )
}
