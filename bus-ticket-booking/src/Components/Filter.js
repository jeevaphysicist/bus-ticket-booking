import React,{useEffect,useState} from 'react';
import Modal, { setAppElement } from "react-modal";
import {useParams,Link} from "react-router-dom";
import "../Styles/Filter.css";
import bus1 from "../Assets/bus1.jpeg";

Modal.setAppElement("#root");

// modal styling
const customStyles = {
    content: {
   top:"250px",
   left:"100px",
    right:"auto",
//    bottom:"auto",
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    input:{
       width:"300px"
    }
         }     
   };


export default function Filter() {
    const [filtermodal,setFiltermodal] = useState(false);
    const [busdetails,SetBusdetails]= useState([])
    let {source,destination,date} = useParams();
    source = source.trim().toLowerCase();
    destination = destination.trim().toLowerCase();
    const [filter,setFilter] = useState({
      sourceCity:source,
      destinationCity:destination,
      date:date,
      lcost:"",
      hcost:"",
      busType:[],
      busSeatType:[]
        });



        useEffect(()=>{
          console.log("filter : ",filter);
          fetch("http://localhost:9090/bus",{method:'POST',
          headers:{"Content-Type":"application/json"},
            body:JSON.stringify(filter)
          }).then(res=>res.json())
          .then(result=>{
            console.log("Result : ",result);
            SetBusdetails(result.data);
          })

        },[filter])
       

   

    // handle bustype
    const handlebustype =(e)=>{
      console.log('event',e);
      if(e.target.checked){
        filter.busType.push(e.target.name);
        console.log("name",e.target.name);
        
      }
      else{
        let index = filter.busType.indexOf(e.target.name) ;
        if(index > -1){
        filter.busType.splice(index,1);
        }
      }
      setFilter({...filter});
     }
     // handlebustype
    const handleseattype =(e)=>{
      console.log('event',e);
      if(e.target.checked){
        filter.busSeatType.push(e.target.name);
        console.log("name",e.target.name);
        
      }
      else{
        let index = filter.busType.indexOf(e.target.name) ;
        if(index > -1){
        filter.busSeatType.splice(index,1);
        }
      }
      setFilter({...filter});
     }


     //handlecost
     const handlecost =(lcost,hcost)=>{
      console.log(lcost,hcost);
      filter.lcost = lcost;
      filter.hcost = hcost;
      setFilter({...filter});
     }
  return (
    <React.Fragment >
         <div className='row mt-4 colors container'>
            <div className='col-12 col-sm-12 col-md-2 col-lg-2 col-xl-2'></div>
            <div className='col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1'>
                <button className='btn btn-block btn-danger' onClick={()=>{setFiltermodal(true)}}>Filters</button>
            </div>
            <div className='col-12 col-sm-12 col-md-9 col-lg-9 col-xl-9'></div>
         </div>

       <br/><br/>
         <div className='heading'> Total Bus Available :{busdetails.length}</div>
         <div>
            <div className='row container'>
              { busdetails.length>0 ? busdetails.map((items,index)=> <div className='col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 my-3 colors' key={index}>
               <div className='card'>
                <Link to={`/details/${items._id}`} style={{textDecoration:"none"}}>
                  <div className='row'>
                     <div className='col-6'>
                       <div className='name'>{items.CompanyName}</div><br/>
                       <div><img src={bus1} style={{width:"100px",height:"100px"}} alt="not available"/></div>
                       
                     </div>
                     <div className='col-6'>
                      {/* <div>Ratings :&#9734;3</div> */}
                      <div>From : {items.startCity}</div>
                      <div>To : {items.destination}</div>
                      
                      {
                        items.busType.map((data,index)=><span key={index}>Bus Type :{data.name}<br/></span>)
                        } 
                        
                      <div>total seats :{items.totalSeats}</div>
                      <div>price/seat : {items.pricePerSeat}</div>
                      <div>Date: {items.date}</div>
                     </div>
                  </div>
                  </Link>
                </div>
                
              </div>
)
                             :
              <div>no data found</div>

              }
              
      

             
                  </div>
                </div>
             
          

         {/* filter modal */}
         <Modal
          isOpen={filtermodal}
          style={customStyles}>
            <div className='btn btn-close btn-danger' style={{float:"right"}} onClick={()=>setFiltermodal(false)} ></div>
            Filters<br/><br/>
           {/* <p className='headings'>Departure Time</p>
             <input type="checkbox" />&nbsp;<span className='values'>Before 6am </span><br/>
            <input type="checkbox" />&nbsp;<span className='values'>6am to 12pm </span><br/>
            <input type="checkbox" />&nbsp;<span className='values'>12pm to 6pm </span><br/>
            <input type="checkbox" />&nbsp;<span className='values'>After 6am </span><br/><br/> */}
            <p className='headings'> Bus Types</p>
            <input type="checkbox" name="seater"  onChange={(e)=>handlebustype(e)} />&nbsp;<span className='values'  >Seater</span><br/>
            <input type="checkbox" name="sleeper"  onChange={(e)=>handlebustype(e)} />&nbsp;<span className='values'>Sleeper</span><br/>
            <input type="checkbox" name="Multi AXLE AC"  onChange={(e)=>handlebustype(e)} />&nbsp;<span className='values'  >AC </span><br/>
            <input type="checkbox" name="Multi AXLE NON AC"  onChange={(e)=>handlebustype(e)} />&nbsp;<span className='values' >NON AC </span><br/><br/>
            <p className='headings'>Seat Availability</p>
            <input type="checkbox"  name="single"  onChange={(e)=> handleseattype(e)} />&nbsp;<span className='values'>Single Seats </span><br/><br/>
            {/* <p className='headings'>Arrival  Time</p>
            <input type="checkbox" />&nbsp;<span className='values'>Before 6am (0)</span><br/>
            <input type="checkbox" />&nbsp;<span className='values'>6am to 12pm (0)</span><br/>
            <input type="checkbox" />&nbsp;<span className='values'>12pm to 6pm (0)</span><br/>
            <input type="checkbox" />&nbsp;<span className='values'>After 6am (0)</span><br/><br/> */}
            <p className='headings'>Costs</p>
            <input type="radio" name='cost' checked={filter.lcost == 0 && filter.hcost==500} onChange={()=>handlecost(0,500)} />&nbsp;<span className='values'  >&#8377;0 to &#8377;500</span><br/>
            <input type="radio" name='cost' checked={filter.lcost == 500 && filter.hcost==1000} onChange={()=>handlecost(500,1000)} />&nbsp;<span className='values'  >&#8377;500 to &#8377;1000</span><br/>
            <input type="radio" name='cost' checked={filter.lcost == 1000 && filter.hcost==2000} onChange={()=>handlecost(1000,2000)} />&nbsp;<span className='values'  >&#8377;1000 to &#8377;2000</span><br/>
            <input type="radio" name='cost' checked={filter.lcost == 2000 && filter.hcost==4000} onChange={()=>handlecost(2000,4000)} />&nbsp;<span className='values'  >&#8377;2000 to &#8377;4000</span><br/><br/>
            <button className='btn btn-block btn-danger' onClick={()=>setFiltermodal(false)}>Cancel</button>

            
         </Modal>
    </React.Fragment>
  )
}
