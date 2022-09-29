import React, { useEffect,useState } from 'react';
import {useParams,Link} from "react-router-dom";
import Header from './Header';
import "../Styles/List.css";
import Filter from "./Filter";
import bus1 from "../Assets/bus1.jpeg" 

export default function List() {
    
  return (
    <React.Fragment>
      <div className='listback'>
      <Header/>
      <Filter/>
      </div>                    
    </React.Fragment>
  )
}
