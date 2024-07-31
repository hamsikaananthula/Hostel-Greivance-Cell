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
 function Dd1(){
  const navigate =useNavigate();

  // Handle potential absence of data\\
// console.log(complaints);
const[suc,setSuc]=useState(false);
axios.defaults.withCredentials = true;
  //const params=useParams();
  const [complaints,setComplaints]=useState([])
  const params=useParams();
   const {HostelName,category} =useParams();
   console.log(HostelName);
   console.log(category);
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

   useEffect(() => {
      console.log(category)
      axios.get(`http://localhost:8080/wgetcomp/${HostelName}/${category}`)
        .then(res => {
          setComplaints(res.data);
          //console.log(res.data);
        })
        .catch(err => console.error(err));
    }, []); 
    const handlec=()=>{
      axios.get("http://localhost:8080/logout").
      then(res=>{
        location.reload(true);
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
            <p><b>Status:</b>{complaint.Status}</p>
            <button  className="btn67" onClick={() =>navigate(`/update/${complaint._id}/${index}/${HostelName}/${category}`, { state: { data: complaints } })}>Update</button>
          </div>
          </div>
         }
        )}
        </div>
        </div>:null
        )
      }
export default Dd1;