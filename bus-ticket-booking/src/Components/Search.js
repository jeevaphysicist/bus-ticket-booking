import React,{useEffect,useState} from 'react';
import {Link} from "react-router-dom";
import Modal from "react-modal";
import "../Styles/Search.css";
import  bus1 from "../Assets/bus1.jpeg";
import busticket1 from "../Assets/busticket1.jpeg";
import bus_travelling from "../Assets/bus-traveling.jpeg";
import buskids from "../Assets/schoolbus.gif";

Modal.setAppElement("#root");
const customStyles = {
  content: {
 top:"40%",
 left:"50%",
  right:"auto",
    //  bottom:"auto",
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  input:{
     width:"300px"
  },
  backgroundColor:"black",
  color:"white"
       }     
 };

export default function Search() {
      const [sourcename,setSourcename] = useState("");
      const [destinationname,setDestinationname] = useState('');
      const [ticketdetails,setTicketdetails] = useState('');
      const [ticketmodal,setTicketmodal] = useState(false);
      const [date,setDate]= useState("");
    

 let userlogindata = localStorage.getItem("user");
 userlogindata = JSON.parse(userlogindata);

 
  

       useEffect(()=>{
        if( userlogindata != undefined && userlogindata.length > 0){
          if(userlogindata[0].password != undefined){
            let req={
              email:userlogindata[0].email,
              password:userlogindata[0].password
            }
            console.log("req : ",req);
            fetch("http://localhost:9090/tickets/app/gettickets",{method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(req)
            }).then(res=>res.json())
            .then(result=>{
              console.log('result : ',result);
              setTicketdetails(result.data);
            })

          }
          else{
            let req={
              email:userlogindata[0].email,
              userid:userlogindata[0].userId
            }
            console.log("req : ",req);
            fetch("http://localhost:9090/tickets/social/gettickets",{method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(req)
            }).then(res=>res.json())
            .then(result=>{
              console.log('result : ',result);
              setTicketdetails(result.data);
            })

          }
        }
          
       },[]);
       let ticketlist;
       if(ticketdetails != undefined && ticketdetails.length >0){
        console.log("ticket ready");
        
          console.log(" ticket is ready");

          ticketlist =  ticketdetails.length >0 && ticketdetails.map(items=>
               items.passengerName.length >0 && items.passengerName.map((item,index)=><div className='card ticket my-3' key={index}>
               <div>Name :<u>{item} </u> </div>
               <div>Gender :<u> {items.Gender[index]} </u></div>
               <div>Bus Name:<u>{items.busName}</u></div>
               <div>BusNo : <u>{items.busNo}</u></div>
               <div>Cost :<u>&#8377; {items.cost[index]}</u></div>
               <div>SeatNo :<u> {items.seatNo[index]}</u></div>
               <div>StartCity :<u> {items.startCity}</u></div>
               <div>Destination : <u>{items.destinationCity}</u></div>
               <div>Date :<u>{items.date}</u></div> 
             </div>) 
           
          )        
     }
       else{
        ticketlist =<div className='text-warning'>You not reserved any ticket, Please reserved your tickets</div>
       }

      


      

      

     

console.log("ticketdetails",ticketdetails);

  return (
   <React.Fragment>
         <div className =' py-4 mt-4 mb-4 search-part'>
         <div className='ava mb-3'>Available Locations</div>
          <marquee>
            <div className='marq'>[From : Chennai To : Coimbatore ],[From :Chennai To: bangalore ],[From :Chennai To: Hyderabad ],[From :Chennai To: Vishakapatnam ],[From :Chennai To: Salem ]
              ,[From :Chennai  To :Tirunelveli],[From :Bangalore  To :Chennai],[From :Bangalore  To :Salem],[From :Bangalore  To :Hyderabad],[From :Bangalore  To :Coimbatore]
              ,[From :Bangalore  To :Vishakapatnam],[From :Bangalore  To :Kochi],[From: Kochi To :Chennai],[From: Kochi To :OOty],[From: Kochi To :Salem],[From: Kochi To :Bangalore]
              ,[From: Kochi To :Vishakapatnam],[From :Kakinada  To :Trichy]
            </div>
          </marquee>
          <div className='showticket'>
            <p style={{color:"white"}}>click below button to show your tickets</p>
            <button className='btn btn-block btn-primary my-3' onClick={ ()=>{setTicketmodal(true) }}>SHOW MY TICKETS</button>
          </div>
            <div className='row my-4'>
                <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'></div>
                <div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 text-center'>
                 <div style={{color:"whitesmoke"}} className="my-3 "> Search your bus</div>
                   <div className="card shadow-lg p-4 ">
                    <div style={{color:"ButtonHighlight"}}>Fill the below required details</div>
                   <div style={{color:"red",fontFamily:"cursive"}}>From</div><br/>
                    <input type="text" placeholder='Source Name'  className='shadow' onChange={(e)=>{setSourcename(e.target.value)}} />
                   
                    <br/>
                    <div style={{color:"red",fontFamily:"cursive"}}>TO</div>
                    <br/>
                    <input type="text" placeholder='Destination Name' className='shadow' onChange={(e)=>{setDestinationname(e.target.value)}} /><br/>
                    <p style={{color:"blue",fontFamily:"cursive"}}>Date </p>
                    <input type="date"  min="2022-08-22" max="2022-08-25"  onChange={(e)=>{setDate(e.target.value)}} /><br/>
                    {(sourcename != "") && (destinationname != "") && (date != "")?
                    <div className='mx-auto'>
                   <Link to={`/lists/${sourcename}/${destinationname}/${date}` }> <button className='search-bar btn btn-block'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-search" viewBox="0 0 16 16">
                         <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    </button></Link>
                    <Link to={`/lists/${sourcename}/${destinationname}/${date}` }><button className='btn btn-block btn-success search' >Search</button></Link>
                    </div>
                     :
                     <div className='mx-auto'>
                     <button className='search-bar btn btn-block'>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-search" viewBox="0 0 16 16">
                          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                     </svg>
                     </button>
                     <button className='btn btn-block btn-success search' >Search</button>
                     </div>
                    
                    }
                   </div>
                   
                </div>
                <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'></div> 
            </div>
            </div>

            {/* carousel part */}
    {/* <div className='container row mx-auto '>
    <div className='col-12 col-sm-12 col-md-3 col-xl-3 col-lg-3'></div>
    <div className='col-12 col-sm-12 col-md-6 col-xl-6 col-lg-6'>
   <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
  
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="3000">
      <img src={bus1} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item" data-bs-interval="3000">
      <img src={busticket1} className="d-block w-100" alt="..." />
    </div>
    <div className="carousel-item" data-bs-interval="3000" >
      <img src={buskids} className="d-block w-100" alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
</div>
 <div className='col-12 col-sm-12 col-md-3 col-xl-3 col-lg-3'></div>
</div> */}

    {/* ticket modal */}

    <Modal
    isOpen={ticketmodal}
    style={customStyles}
    >
      Your tickets 
      <button className='btn btn-block btn-close btn-white close' onClick={()=>{setTicketmodal(false) }} style={{float:'right'}} ></button>
     
     <div className='container tic my-3 '>
      {ticketlist}
     
    </div>
    <button className='btn btn-block btn-danger' onClick={()=>setTicketmodal(false)}>Close</button>

       

    </Modal>
   
        
   </React.Fragment>
  )
}
