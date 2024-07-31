import "./complaint.css";
import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {useParams} from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
 function Dash3(){
  const [category,setCategory]=useState('');
  const[suc,setSuc]=useState(false);
   const navigate=useNavigate();
   const params=useParams();
  const complaints=[];
   const { username, HostelName } = useParams();
   axios.defaults.withCredentials = true;
   const [isFirstRender, setIsFirstRender] = useState(true); // Flag for tracking initial render
 
   useEffect(() => {
     const fetchData = async () => {
       try {
         const res = await axios.get('http://localhost:8080/wdashboard');
         console.log("dashboard: " + res.data);
         if (res.data === "Success") {
           setSuc(true);
         } else {
           navigate('/warden/login');
         }
       } catch (err) {
         console.error(err);
         // Handle errors appropriately, e.g., display an error message
       }
     };
   
     if (isFirstRender) { // Run the function only on the first render
       fetchData();
       setIsFirstRender(false); // Update flag after running
     }
   }, [isFirstRender]);
   // Function to run the second effect's logic
   const runSecondEffect =  () => {
     if (category) { // Check if category is not empty
        console.log(category);
         navigate(`/dd1/${HostelName}/${category}`);
     }
   }; // Dependency array includes category
   const handlec=()=>{
     axios.get("http://localhost:8080/logout").
     then(res=>{
       location.reload(true);
     }).catch(err=>console.log(err));
   }
   const handleClick = (category) => {
       setCategory(category);
       console.log(category);
       runSecondEffect();
   };
   function hom(){
     navigate('/');
   }
    return(
        suc?<div>
        <header>
        <nav className="navbar33">
          <a href onClick={hom} className="nav-link">Home</a>
          <a href onClick={handlec} className="nav-link">Logout</a>
        </nav>
      </header>
      <div className="heading">
      </div>
        <h1 className="header">Register your complaint</h1>
<div className="container33">
  <div className="row33">
    <div className="card33">
      <div className="card-body text-center">
        {/* <i className="fas fa-bolt card-icon"></i> */}
        <h5 className="card-title">Electrical Problem</h5>
        <button className="btn99" onClick={() => handleClick('Electrical')}>Enter</button>
      </div>
    </div>
    <div className="card33">
      <div className="card-body text-center">
        {/* <i className="fas fa-broom card-icon"></i> */}
        <h5 className="card-title">Cleaning Problem</h5>
        <button className="btn99" onClick={() => handleClick('Cleaning')}>Enter</button>
      </div>
    </div>
    <div className="card33">
      <div className="card-body text-center">
        {/* <i className="fas fa-exclamation-triangle card-icon"></i> */}
        <h5 className="card-title">General Problem</h5>
        <button className="btn99" onClick={() => handleClick('General')}>Enter</button>
      </div>
    </div>
  </div>
</div>

  </div>:null
    );
}
export default Dash3;