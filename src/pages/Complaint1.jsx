
import "./complaintform.css";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
function Complaint1(){
  const{username}=useParams();
    const [RoomNo, setRoomNo] = useState()
    const[idd,setid]=useState();
    const [HostelName, setHstlname] = useState()
    const [details, setdetail] = useState()
    const navigate = useNavigate()
    const[category, setCategory] = useState('')
    const[suc,setSuc]=useState(false);
    axios.defaults.withCredentials = true;
    const [isFirstRender, setIsFirstRender] = useState(true);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get('http://localhost:8080/dashboard');
          console.log("dashboard: " + res.data);
          if (res.data === "Success") {
            setSuc(true);
          } else {
            navigate('/student/login');
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

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8080/create', {idd, RoomNo,HostelName,category,details})
        .then(res => {
            console.log(res.data);
            console.log(category);
           navigate(`/success/${username}`);
        })
        .catch(err => console.log(err))
    }
    const handleStatusChange = (event) => {
      setCategory(event.target.value);
      console.log(category);
    };
    const handlec=()=>{
      axios.get("http://localhost:8080/logout").
      then(res=>{
        location.reload(true);
      }).catch(err=>console.log(err));
    }
    function hom(){
      navigate(`/dash/student/${username}`);
    }
    return (
       suc?<div>
        <header>
        <nav className="navbar29">
          <a href="#" onClick={hom} className="nav-link">Home</a>
          <a href="#"  onClick={handlec}className="nav-link">Logout</a>
        </nav>
      </header>
        <div className="container29">
            <h1 className="h11">Complaint Form</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="rollNo">Enter Your Id:</label>
                <input
                   type="text" id="rollNo"   onChange={(e) => setid(e.target.value)} required
                />

                <label htmlFor="roomNo">Room No:</label>
                <input
                    type="text" id="rollNo"   onChange={(e) => setRoomNo(e.target.value)} required
                />

            <label >Complaint Category</label>
            <select
              value={category} // Pre-select based on state
              onChange={(event) => handleStatusChange(event)}
            >
             <option value="nothing">nothing</option>
              <option value="Electrical">Electrical</option>
              <option value="Cleaning">Cleaning</option>
              <option value="General">General</option>
            </select>

                <label htmlFor="hostelName">Hostel Name:</label>
                <input
                   type="text" id="HostelName"  onChange={(e) => setHstlname(e.target.value)}  required
                />

                <label htmlFor="details">Tell us about your complaint:</label>
                <textarea
                    id="details"  rows="5"  onChange={(e) => setdetail(e.target.value)} required
                ></textarea>
                <input className="sub" type="submit" value="Submit" />
            </form>
        </div>
        </div>:null
    );
}
export default Complaint1;
