import "./Wdatadis.css";
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

 function Wdatadis(){
    const { username, category } = useParams();
    const [complaint, setComplaint] = useState(null); 
    const [selectedStatus, setSelectedStatus] = useState('');
    const [id,setid]=useState();// To hold fetched complaint data
    const[suc,setSuc]=useState(false);
    const navigate=useNavigate();
    axios.defaults.withCredentials = true;
      useEffect(() => {
      axios.get('http://localhost:8080/wodashboard')
        .then(res => {
          if (res.data === "Success") {
            setSuc(true);
            // Trigger second effect after successful login
          } else {
            navigate('/worker/login');
          }
        })
        .catch(err => console.error(err));
    }, []);
    useEffect(() => {
      const endpoint = category === 'Electrical' ? '/getecompw/' : '/getccomppw/';
      axios.get(`http://localhost:8080${endpoint}${username}`)
        .then(res => {
          setComplaint(res.data);// Assuming response is not an array
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // Handle errors (e.g., display an error message to the user)
        });
    }, [category, username]);
  
    const handleStatusChange = (event) => {
     setSelectedStatus(event.target.value);
   };
  const handleUpdate = (complaintId) => {
     const endpoint = category === 'Electrical' ? '/eupdatecomplaint/' : '/cupdatecomplaint/';
     axios.put(`http://localhost:8080${endpoint}${complaintId}`, { // Assuming a PUT request
       status: selectedStatus // Send the selected status in the request body
     })
       .then(response => {
         console.log('Complaint status updated successfully:', response.data);
         // Update local state for UI (optional, as shown before)
       })
       .catch(error => {
         console.error('Error updating complaint:', error);
         // Handle errors (e.g., display an error message to the user)
       });
       const buttonToUpdate = document.getElementById(`update-${complaintId}`);
        if (buttonToUpdate) {
            buttonToUpdate.style.color="green";
          buttonToUpdate.textContent = 'Updated'; // Change button text to "Updated"
        } else {
          console.warn(`Button with ID update-button-${complaintId} not found for updating text.`);
        }
   };
   const handlec=()=>{
    axios.get("http://localhost:8080/logout").
    then(res=>{
      window.location.href = "/warden/login";
    }).catch(err=>console.log(err));
  }
  function hom(){
    navigate("/");
  }
    return(
        suc?
        <div>
             <header>
        <nav className="navbar55">
          <a href="#" onClick={hom}  className="nav-link">Home</a>
          <a href="#" onClick={handlec} className="nav-link">Logout</a>
        </nav>
       
      </header>
      <h1 className="h55">Complaints</h1> 
      {complaint?(
<div class="container55">
       {complaint.filter((complaintItem) =>
          complaintItem.Status === "Submitted" ||
          complaintItem.Status === "Ongoing Work"
        ).map((complaintItem) => (
            <div className="box55" id="box55">
            <div className="inner55" key={complaintItem.id}>
            <p><b>Name:</b> {complaintItem.idd}</p>
            <p><b>Room:</b> {complaintItem.RoomNo} ({complaintItem.HostelName})</p>
            <p><b>Details:</b> {complaintItem.details}</p>
            <p><b>Current Status:</b> {complaintItem.status}</p>

            {/* Dropdown for status update */}
            <label htmlFor={`status-${complaintItem._id}`}>Status:</label>
            <select
              id={`status-${complaintItem._id}`}
              value={selectedStatus} // Pre-select based on state
              onChange={(event) => handleStatusChange(event)}
            >
              <option value="Ongoing Work">Ongoing Work</option>
              <option value="Done With Work">Done With Work</option>
            </select>

            <button className="btn55" id={`update-${complaintItem._id}`} onClick={() => handleUpdate(complaintItem._id)}>Update</button>
          </div>
          </div>
        ))}
          </div>  ):<h2>No Complaints Registered</h2>}
     </div>:null  
    );
}
export default Wdatadis;