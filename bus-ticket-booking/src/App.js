import Home from "./Components/Home";
import "./App.css"
import {Routes,Route} from "react-router-dom";
import List from "./Components/List";
import Details from "./Components/Details";
import Transaction from "./Components/Transaction";
import Checked from "./Components/Checked";
import Appintro from "./Components/intro/Appintro";

function App() {
  return (
     
      <Routes>
        <Route path="/" element={<Appintro/>}/>
        <Route path="/home" element={<Home/>} />
        <Route path="/lists/:source/:destination/:date" element={<List/>}/>
        <Route path="/details/:id" element={<Details/>} />
        <Route path="/transaction/:seatprice/:id" element={<Transaction/>} />
        <Route path="/checked" element={<Checked/>}/>
     </Routes>
      
    

  );
}

export default App;
