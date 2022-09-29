import React, { useState } from 'react';
import "../../Styles/appintro/Appintro.css";
import bus_icon from "../../Assets/bus_icon1.jpeg";

export default function Appintro() {
    const [screenwidth,setScreenwidth] = useState(window.innerWidth);
    const [screenheight,setScreenheight] = useState(window.innerHeight);
  
  return (
    <div className='introback' style={{"--i":`${screenwidth}px`,"--j":`${screenheight}px`}}>
          <center>
          <div>
            <p className='logo-name'>EASY BUS<br/>
            <img src={bus_icon} alt="not available" className='logo-image' />
            </p>
           </div>
       </center>
    </div>
  )
}