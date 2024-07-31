import "./Dd1.css";
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import "./Dd1.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
 function Dd3(){
  const navigate =useNavigate();
  // Handle potential absence of data/ console.log(complaints)
axios.defaults.withCredentials = true;
  //const params=useParams();
 const location = useLocation();
  const complaints = location.state?.data || [];
  const complaintsCopy = [...complaints]; // Create a copy to avoid mutation
  //console.log(comp.id);
  //console.log(comp.)
  axios.defaults.withCredentials = true;
  const[suc,setSuc]=useState(false);
  useEffect(()=> {
      axios.get('http://localhost:8080/wdashboard')
      .then(res => {
          console.log("dashboad: " + res.data);
          if(res.data === "Success") {
              setSuc(true)
          }else{
              navigate('/warden/login')
          }
      }).catch(err => console.log(err))
  }, []);
  const {HostelName}=useParams();
   axios.defaults.withCredentials = true;
   const [isFirstRender, setIsFirstRender] = useState(true);
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
    const handlec=()=>{
      axios.get("http://localhost:8080/logout").
      then(res=>{
        window.location.href = "/warden/login";
      }).catch(err=>console.log(err));
    }
    function hom(){
      navigate(`/dash/warden/${HostelName}`);
    }
    return(
        suc?
        <div>
          <header>
        <nav className="navbar67">
          <a href="#" onClick={hom} className="nav-link">Home</a>
          <a href="#" onClick={handlec} className="nav-link">Logout</a>
        </nav>
      </header>
      <h1 className="h67">Complaints</h1>
<div class="container67">
{complaints.map((complaint,index) => {
         console.log(complaint);
          return  <div className="box67" id="box1">
       <div className="inner67">
           <p><b>Name:</b> {complaint.idd}</p>
            <p><b>Room:</b> {complaint.RoomNo} ({complaint.HostelName})</p>
            <p><b>Details:</b> {complaint.details}</p>
            <p><b>Status:</b> {complaint.Status}</p>
            <p><b>Worker:</b> {complaint.Worker?.name || 'N/A'}</p> 
          </div>
          </div>
         }
        )}
        </div>
        </div>:null
        )
      }
export default Dd3;