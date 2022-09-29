import React,{useState} from 'react';
import "../../Styles/appintro/Appintro.css";
import bus_icon from "../../Assets/bus_icon1.jpeg";
import { Link } from 'react-router-dom';


export default function Afterintro() {
    const [screenwidth,setScreenwidth] = useState(window.innerWidth);
    const [screenheight,setScreenheight] = useState(window.innerHeight);
  return (
    <React.Fragment>
         <div className='introback1' style={{"--i":`${screenwidth}px`,"--j":`${screenheight}px`}}>
            <div className='row pt-4'>
                <div className='col-12 col-sm-12 col-md-1 col-lg-1 col-xl-1'></div>
                <div className='col-12 col-sm-12 col-md-3 col-lg-3 col-xl-3'>
                <center>
                <p className='logo-name'>EASY BUS<br/>
                <img src={bus_icon} alt="not available" className='logo-image' />
                </p>
                <span style={{color:"skyblue"}}>GET A MEMORABLE JOURNEY</span>
                </center>
                
                </div>
            </div>

            <div className='container mt-4'>
                <h1 style={{color:"white"}}>Welcome EASY BUS</h1>
                <ul style={{color:"gray"}}>
                    <li>Choose a favorite bus at easy</li>
                    <li>Get a ticket at affordale</li>
                    <li>Go everywhere easy</li>
                </ul>
                <Link to="/home">
                <button className='continue'>Continue</button>
                </Link>
            </div>

        </div>

    </React.Fragment>
  )
}
