import React,{useEffect,useState} from 'react';
import "../Styles/Details.css";
import Header from "./Header";
import { FaAngleDoubleDown } from "react-icons/fa";
import {Link,useParams} from "react-router-dom"

export default function Details() {
  const [name, setName] = useState([]);
  const [arrowDown, setArrowDown] = useState(false);
  const [gender, setGender] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const [seatNumber, setSeatnumber] = useState([]);
  const [bus,setBus] = useState([]);
  const [seat,SetSeat] = useState([]);
  const [gee,setGee] = useState([]);

 // const [genderposition,setGenderposition]= useState([]);
  const [get,setGet]= useState([]);
const {id} = useParams();
console.log("bus details", id);

useEffect(()=>{
    fetch(`http://localhost:9090/busdetails`,{method:"POST",
       headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id})
     })
    .then(res=>res.json())
    .then(result=>{
        console.log("result:",result);
        setBus(result.data[0]);
        setReservedSeat(result.data[0].notAvailable);

    })
},[])
console.log("reservedseats : ",reservedSeat);

  const getSeatNumber = (e) => {
    console.log("seat number", seatNumber);
    renderPassengerData(seatNumber)
   
    let newSeat = e.target.value
    console.log("new seat :",newSeat);
    if (seat.includes(newSeat)) {
         e.disabled = true
        if (seatNumber.includes(newSeat)) {
            setSeatnumber(seatNumber.filter(seat => seat !== newSeat));
            SetSeat(seat.filter(seat => seat !== newSeat))
        }
    } else {
         setSeatnumber([...seatNumber, newSeat])
         SetSeat([...seat, newSeat])
        console.log(seatNumber)
    }
}
    const handleGender = (e, seatNo) => {
        const { value } = e.target;
         let names= e.target.name;
        let  nam = names.toString();
        
      
         if(get.find(element=>element == nam)){
            console.log("e.target.name",nam);
            gender.splice(nam,1,value)
            setGender(gender);
            console.log("positons:",get);
            console.log("gender",gender);
           }
    
         else{
            // names = JSON.tostringify(names);
            setGet(current=>[...current,names]);
            setGender(gender.concat(value));
            console.log("addpositons:",get);
            console.log("addgender",gender);

        }
             
           
        
       
        // console.log(value)
        // setPassengers(prevState => ({ ...prevState, SeatNo: seatNo, Gender: value }))
    }


    const handlePassengerName = (e, seatNo) => {
       // e.preventDefault()
        let value = e.target.value;
        let names= e.target.name;
        let  nam = names.toString();

        // console.log(value)
        // if (" " == value) {
        //     return (setName("name is required"))
        // } 
        // else {
             if(gee != undefined){
            if(gee.find(element=>element == nam)){
                console.log("e.target.name",nam);
                name.splice(names,1,value)
                setName(name);
                console.log("positons:",gee);
                console.log("name",name);
               }
               else{
                setGee(current=>[...current,names]);
                setName(name.concat(value));
                console.log("addgee:",gee);
                console.log("addname",name);
                // setPassengers(prevState => ({ ...prevState, SeatNo: seatNo, Name: value }))
                   }}
               else{
            setGee(current=>[...current,names]);
            setName(name.concat(value));
            console.log("addgee:",gee);
            console.log("addname",name);
            // setPassengers(prevState => ({ ...prevState, SeatNo: seatNo, Name: value }))
               }
        // }
    }
    const handleSubmitDetails = e => {
        e.preventDefault()
        setArrowDown(true)
        localStorage.setItem("reservedSeats", JSON.stringify(seatNumber));
        localStorage.setItem("nameData", JSON.stringify(name));
        localStorage.setItem("passengerGender",JSON.stringify(gender));
        console.log(name)
        console.log("Gender",gender)
    }

    const renderPassengerData = (seatArray) => {
        return seatArray.map((seat, idx) => {
            return (
                <form key={idx} className="form p-4 seatfrm">
                    <p className="text-capitalize text-center">Seat No:{seat}</p>
                    <input className="form-control seatInp" onChange={e => handlePassengerName(e, seat)} type="text" name={idx} placeholder="Enter Name" />
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={idx} id="male" value="Male" onClick={e => handleGender(e, seat)} />
                        <label className="form-check-label" htmlFor="male">Male</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name={idx} id="female" value="Female" onClick={e => handleGender(e, seat)} />
                        <label className="form-check-label" htmlFor="female">Female</label>
                    </div>
                    <hr/>
                </form>)

        })
    }
    console.log("bus : ",bus);

    const {CompanyName,availableSeats,busNumber,busType,date,destination,pricePerSeat,startCity,totalSeats} = bus;

  return (
   <React.Fragment>
    <div className='back'>
    <Header/>
                   <div className='container p-4 text-center col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 mt-4 card details'>
                    <div>Brand :&nbsp; {CompanyName}</div>
                    <div> {
                        
                        
                     busType != undefined && busType.length>0 &&  busType.map((data,index)=><span key={index}>Bus Type :{data.name}<br/></span>)
                        } </div>
                    <div>From :&nbsp;{startCity} </div>
                    <div>To :&nbsp; {destination}</div>
                    <div>Total Seats:&nbsp; {totalSeats}</div>
                    <div>Available seats :&nbsp; {availableSeats}</div>
                    <div>Price/seat:&nbsp; &#8377;{pricePerSeat}</div>
                    </div>
                    <div className='container'>
                    <div className='sea'></div><span className='sea2'>ReservedSeats</span>
                    <div className='sea1'></div><span className='sea4'>AvailableSeats</span>
                    </div>
                      <div className='row seatdisplay ' style={{backgroundColor:"black",color:"white"}}>
                      <div className='card  mb-4 shadow-lg  col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6'>
                        <form onChange={e => getSeatNumber(e)}>
                                <ol className="">
                                <li className="row row--1">                                    
                                    <ol className="seats" type="A">
                                      {
                                        reservedSeat.find(element =>element =="1A")?
                                        <li className="seat">
                                        <input type="checkbox" disabled  value="1A" id="1A" />
                                        <label htmlFor="1A">1A</label>
                                    </li> 
                                     :
                                     <li className="seat">
                                     <input type="checkbox"  value="1A" id="1A" />
                                     <label htmlFor="1A">1A</label>
                                 </li>
                                      }
                                       {
                                         reservedSeat.find(element =>element =="1B")?
                                         <li className="seat">
                                            <input type="checkbox" disabled id="1B" value="1B" />
                                            <label htmlFor="1B">1B</label>
                                        </li>

                                         :
                                         <li className="seat">
                                            <input type="checkbox" id="1B" value="1B" />
                                            <label htmlFor="1B">1B</label>
                                        </li>
                                       }
                                        
                                        {
                                             reservedSeat.find(element =>element =="1C")?
                                             <li className="seat">
                                             <input type="checkbox" disabled value="1C" id="1C" />
                                             <label htmlFor="1C">1C</label>
                                         </li>
                                             :
                                             <li className="seat">
                                             <input type="checkbox" value="1C" id="1C" />
                                             <label htmlFor="1C">1C</label>
                                         </li>

                                        }
                                       
                                    </ol>
                                </li>
                                <li className="row row--2">
                                    <ol className="seats" type="A">
                                        {
                                            reservedSeat.find(element =>element =="2A")? 
                                            <li className="seat">
                                            <input type="checkbox" disabled value="2A" id="2A" />
                                            <label htmlFor="2A">2A</label>
                                        </li>
                                            :
                                            <li className="seat">
                                            <input type="checkbox" value="2A" id="2A" />
                                            <label htmlFor="2A">2A</label>
                                        </li>
                                        }
                                        
                                        {
                                            reservedSeat.find(element =>element =="2B")?
                                            <li className="seat">
                                            <input type="checkbox" disabled  value="2B" id="2B" />
                                            <label htmlFor="2B">2B</label>
                                        </li>  :
                                         <li className="seat">
                                         <input type="checkbox"  value="2B" id="2B" />
                                         <label htmlFor="2B">2B</label>
                                     </li>

                                        }
                                        
                                       
                                        {
                                            reservedSeat.find(element =>element == "2C") ?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="2C" id="2C" />
                                            <label htmlFor="2C">2C</label>
                                        </li>  :
                                        <li className="seat">
                                        <input type="checkbox" value="2C" id="2C" />
                                        <label htmlFor="2C">2C</label>
                                    </li>

                                        }
                                        

                                    </ol>
                                </li>
                                <li className="row row--3">
                                    <ol className="seats" type="A">
                                    {
                                            reservedSeat.find(element =>element =="3A")? 
                                            <li className="seat">
                                            <input type="checkbox" disabled value="3A" id="3A" />
                                            <label htmlFor="3A">3A</label>
                                        </li> :
                                         <li className="seat">
                                         <input type="checkbox" value="3A" id="3A" />
                                         <label htmlFor="3A">3A</label>
                                     </li>

                                        }
                                       
                                        {
                                            reservedSeat.find(element =>element =="3B")?
                                            <li className="seat">
                                            <input type="checkbox" disabled  value="3B" id="3B" />
                                            <label htmlFor="3B">3B</label>
                                        </li>
                                          :
                                          <li className="seat">
                                            <input type="checkbox"  value="3B" id="3B" />
                                            <label htmlFor="3B">3B</label>
                                        </li>

                                        }
                                        
                                        {
                                            reservedSeat.find(element =>element =="3C")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="3C" id="3C" />
                                            <label htmlFor="3C">3C</label>
                                        </li>
                                          :
                                          <li className="seat">
                                            <input type="checkbox" value="3C" id="3C" />
                                            <label htmlFor="3C">3C</label>
                                        </li>

                                        }
                                        

                                    </ol>
                                </li>
                                <li className="row row--4">
                                    <ol className="seats" type="A">
                                    {
                                            reservedSeat.find(element =>element =="4A")?
                                            <li className="seat">
                                            <input type="checkbox" disabled  value="4A" id="4A" />
                                            <label htmlFor="4A">4A</label>
                                        </li>  
                                        :
                                        <li className="seat">
                                        <input type="checkbox"  value="4A" id="4A" />
                                        <label htmlFor="4A">4A</label>
                                    </li>

                                        }
                                       
                                        {
                                            reservedSeat.find(element =>element =="4B")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="4B" id="4B" />
                                            <label htmlFor="4B">4B</label>
                                        </li>
                                          :
                                          <li className="seat">
                                            <input type="checkbox" value="4B" id="4B" />
                                            <label htmlFor="4B">4B</label>
                                        </li>

                                        }
                                        
                                        {
                                            reservedSeat.find(element =>element =="4C")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="4C" id="4C" />
                                            <label htmlFor="4C">4C</label>
                                        </li>
                                          :
                                          <li className="seat">
                                            <input type="checkbox" value="4C" id="4C" />
                                            <label htmlFor="4C">4C</label>
                                        </li>

                                        }
                                        

                                    </ol>
                                </li>
                                <li className="row row--5">
                                    <ol className="seats" type="A">
                                        {
                                            reservedSeat.find(element =>element =="5A")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="5A" id="5A" />
                                            <label htmlFor="5A">5A</label>
                                        </li> 
                                        :
                                        <li className="seat">
                                        <input type="checkbox" value="5A" id="5A" />
                                        <label htmlFor="5A">5A</label>
                                    </li>

                                        }
                                       
                                        {
                                            reservedSeat.find(element =>element =="5B")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="5B" id="5B" />
                                            <label htmlFor="5B">5B</label>
                                        </li>
                                         :
                                         <li className="seat">
                                            <input type="checkbox" value="5B" id="5B" />
                                            <label htmlFor="5B">5B</label>
                                        </li>

                                        }
                                        
                                        {
                                            reservedSeat.find(element =>element =="5C")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="5C" id="5C" />
                                            <label htmlFor="5C">5C</label>
                                        </li>
                                         :
                                         <li className="seat">
                                            <input type="checkbox"  value="5C" id="5C" />
                                            <label htmlFor="5C">5C</label>
                                        </li>

                                        }
                                        

                                    </ol>
                                </li>
                                <li className="row row--6">
                                    <ol className="seats" type="A">
                                    {
                                            reservedSeat.find(element =>element =="6A")?
                                            <li className="seat">
                                            <input type="checkbox" disabled  value="6A" id="6A" />
                                            <label htmlFor="6A">6A</label>
                                        </li>
                                         :
                                         <li className="seat">
                                         <input type="checkbox"  value="6A" id="6A" />
                                         <label htmlFor="6A">6A</label>
                                     </li>

                                        }
                                       
                                        {
                                            reservedSeat.find(element =>element =="6B")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="6B" id="6B" />
                                            <label htmlFor="6B">6B</label>
                                        </li>
                                         :
                                         <li className="seat">
                                         <input type="checkbox" value="6B" id="6B" />
                                         <label htmlFor="6B">6B</label>
                                     </li>

                                        }
                                       
                                        {
                                            reservedSeat.find(element =>element =="6C")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="6C" id="6C" />
                                            <label htmlFor="6C">6C</label>
                                        </li>
                                         :
                                         <li className="seat">
                                            <input type="checkbox" value="6C" id="6C" />
                                            <label htmlFor="6C">6C</label>
                                        </li>

                                        }
                                        

                                    </ol>
                                </li>
                                <li className="row row--7">
                                    <ol className="seats" type="A">
                                    {
                                            reservedSeat.find(element =>element =="7A")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="7A" id="7A" />
                                            <label htmlFor="7A">7A</label>
                                        </li>
                                         :
                                         <li className="seat">
                                         <input type="checkbox" value="7A" id="7A" />
                                         <label htmlFor="7A">7A</label>
                                     </li>

                                        }
                                       
                                        {
                                            reservedSeat.find(element =>element =="7B")? 
                                            <li className="seat">
                                            <input type="checkbox" disabled  value="7B" id="7B" />
                                            <label htmlFor="7B">7B</label>
                                        </li>
                                        :
                                        <li className="seat">
                                        <input type="checkbox"  value="7B" id="7B" />
                                        <label htmlFor="7B">7B</label>
                                    </li>

                                        }
                                       
                                        {
                                            reservedSeat.find(element =>element =="7C")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="7C" id="7C" />
                                            <label htmlFor="7C">7C</label>
                                        </li>
                                         :
                                         <li className="seat">
                                            <input type="checkbox"  value="7C" id="7C" />
                                            <label htmlFor="7C">7C</label>
                                        </li>

                                        }
                                        

                                    </ol>
                                </li>
                                <li className="row row--8">
                                    <ol className="seats" type="A">
                                    {
                                            reservedSeat.find(element =>element =="8A")? 
                                            <li className="seat">
                                            <input type="checkbox" disabled value="8A" id="8A" />
                                            <label htmlFor="8A">8A</label>
                                        </li>
                                        :
                                        <li className="seat">
                                            <input type="checkbox" value="8A" id="8A" />
                                            <label htmlFor="8A">8A</label>
                                        </li>

                                        }
                                        
                                        {
                                            reservedSeat.find(element =>element =="8B")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="8B" id="8B" />
                                            <label htmlFor="8B">8B</label>
                                        </li>
                                         :
                                         <li className="seat">
                                            <input type="checkbox"  value="8B" id="8B" />
                                            <label htmlFor="8B">8B</label>
                                        </li>

                                        }
                                        
                                        {
                                            reservedSeat.find(element =>element =="8C")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="8C" id="8C" />
                                            <label htmlFor="8C">8C</label>
                                        </li>
                                         :
                                         <li className="seat">
                                         <input type="checkbox" value="8C" id="8C" />
                                         <label htmlFor="8C">8C</label>
                                     </li>

                                        }
                                       

                                    </ol>
                                </li>
                                <li className="row row--9">
                                    <ol className="seats" type="A">
                                    {
                                            reservedSeat.find(element =>element =="9A")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="9A" id="9A" />
                                            <label htmlFor="9A">9A</label>
                                        </li>
                                        :
                                        <li className="seat">
                                        <input type="checkbox" value="9A" id="9A" />
                                        <label htmlFor="9A">9A</label>
                                    </li>

                                        }
                                       
                                        {
                                            reservedSeat.find(element =>element =="9B")? 
                                            <li className="seat">
                                            <input type="checkbox" disabled value="9B" id="9B" />
                                            <label htmlFor="9B">9B</label>
                                        </li>
                                        :
                                        <li className="seat">
                                        <input type="checkbox"  value="9B" id="9B" />
                                        <label htmlFor="9B">9B</label>
                                    </li>

                                        }
                                       
                                        {
                                            reservedSeat.find(element =>element =="9C")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="9C" id="9C" />
                                            <label htmlFor="9C">9C</label>
                                        </li>
                                         :
                                         <li className="seat">
                                            <input type="checkbox"  value="9C" id="9C" />
                                            <label htmlFor="9C">9C</label>
                                        </li>

                                        }
                                        

                                    </ol>
                                </li>
                                <li className="row row--10">
                                    <ol className="seats" type="A">
                                    {
                                            reservedSeat.find(element =>element =="10A")? 
                                            <li className="seat">
                                            <input type="checkbox" disabled value="10A" id="10A" />
                                            <label htmlFor="10A">10A</label>
                                        </li>
                                        :
                                        <li className="seat">
                                            <input type="checkbox" value="10A" id="10A" />
                                            <label htmlFor="10A">10A</label>
                                        </li>

                                        }
                                        
                                        {
                                            reservedSeat.find(element =>element =="10B")?
                                            <li className="seat">
                                            <input type="checkbox" disabled value="10B" id="10B" />
                                            <label htmlFor="10B">10B</label>
                                        </li>
                                         :
                                         <li className="seat">
                                            <input type="checkbox" value="10B" id="10B" />
                                            <label htmlFor="10B">10B</label>
                                        </li>

                                        }
                                        
                                        {
                                            reservedSeat.find(element =>element =="10C")? 
                                            <li className="seat">
                                            <input type="checkbox" disabled value="10C" id="10C" />
                                            <label htmlFor="10C">10C</label>
                                        </li>
                                        :
                                        <li className="seat">
                                            <input type="checkbox" value="10C" id="10C" />
                                            <label htmlFor="10C">10C</label>
                                        </li>

                                        }
                                        
                                    </ol>
                                </li>
                            </ol>
                        </form>
                        </div>     
                       

                        <div className="col-6">
                    <div className="seatInfo">
                        <form className="form-group">
                            {renderPassengerData(seatNumber)}
                        </form>
                        <div>
                            <button onClick={e => handleSubmitDetails(e)} className="btn btn-info seatBT">
                            <Link to={`/transaction/${pricePerSeat}/${id}`} style={{textDecoration:"none"}}>
                                Confirm Details
                            </Link>
                            </button>
                          
                        </div>
                        <div className={arrowDown ? "activeArrow2" : "nonActive"}>
                            <FaAngleDoubleDown />
                        </div>
                    </div>
                    </div>
                

</div>
                       
                 

   
  </div>
   </React.Fragment>
  )
}
