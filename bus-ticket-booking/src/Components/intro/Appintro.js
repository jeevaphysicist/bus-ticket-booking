import React,{useState} from 'react';
import Beforeintro from "./Beforeintro";
import {useTimeout} from "usehooks-ts";
import Afterintro from './Afterintro';

export default function Appintro() {
  const [visible,setVisible] = useState(true);
  const hide = ()=>setVisible(false);
  useTimeout(hide,2000)

  return (
    <React.Fragment>
     { visible ?
      <Beforeintro/>
      :
     <Afterintro/>
  }
      

    </React.Fragment>
   
  )
}





