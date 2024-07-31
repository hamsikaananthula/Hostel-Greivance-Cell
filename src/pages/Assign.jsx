//import "./Assign.css";
import "./Assign.css";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
 function Assign(){
  const navigate=useNavigate();
  const {id}=useParams();
  const{index}=useParams();
  const{HostelName}=useParams();
  const location = useLocation();
  const complaints= location.state?.data || [];
 const [selectedWorker, setSelectedWorker] = useState(null);
 const [availableWorkers, setAvailableWorkers] = useState([]);
 const [isLoading, setIsLoading] = useState(false);
 const [errorMessage, setErrorMessage] = useState(null);
 const updatedComplaintIndex =index;
 const[suc,setSuc]=useState(false);
 axios.defaults.withCredentials = true;
 const [isFirstRender, setIsFirstRender] = useState(true); // Flag for tracking initial render
 useEffect(() => {
   const fetchAvailableWorkers = async () => {
     setIsLoading(true);
     try {
       const response = await axios.get('http://localhost:8080/workers/available');
       console.log(response.data) // Replace with your API endpoint
       setAvailableWorkers(response.data);
     } catch (error) {
       setErrorMessage('Error fetching available workers');
     } finally {
       setIsLoading(false);
     }
   };

   fetchAvailableWorkers();
 }, []);
 const handleWorkerSelect = (workerId) => {
   setSelectedWorker(workerId);
 };
 const handleSubmit = async (e) => {
   console.log("hello");
   e.preventDefault();
 
   if (!selectedWorker) {
     alert('Please select a worker before submitting.');
     return; // Prevent navigation if no worker is selected
   }
 
   try {
     const updateResponse = await axios.put(`http://localhost:8080/update/${id}`, { selectedWorker });
     console.log("Complaint updated:", updateResponse.data);
 
     // Assuming successful update is indicated by status code or data:
// Pass updated complaints array
   } catch (error) {
     console.error(error);
     // Handle errors appropriately, e.g., display error messages to the user
   }
 };
 const handle=async(e)=>{
   try{
     const getResponse = await axios.get(`http://localhost:8080/updatecomp/${id}`);
     const updatedComplaint = getResponse.data;
     console.log("Fetched updated complaint:", updatedComplaint);
     console.log("complaints are");
     //console.log(comp);
     const updatedComplaints =[...complaints];// Create a copy
     updatedComplaints[updatedComplaintIndex] = updatedComplaint;
     console
     console.log("Updated complaints array:", updatedComplaints);
 
     navigate(`/dd3/${HostelName}`, { state: { data: updatedComplaints } });
   }
   catch(error){
     console.log(error);
   }
 }
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
        <>
        <div>
             <header>
        <nav className="navbar45">
          <a href="#" onClick={hom} className="nav-link">Home</a>
          <a href="#" onClick={handlec} className="nav-link">Logout</a>
        </nav>
      </header>
  <div className="container45">
    <div className="card45">
      <div className="card-body text-center">
        <div className="p1">
        <p>Assign worker to Complaint</p>
        </div>
        <p className="p2">Available Workers</p>
        <select value={selectedWorker} onChange={(e) => handleWorkerSelect(e.target.value)}>
              <option value="">-- Select Worker --</option>
              {availableWorkers.map((worker) => (
                <option key={worker._id} value={worker._id}>
                  {worker.name} {worker.expertise} {worker._id}
                </option>
              ))}
            </select>
            <button onClick={handleSubmit} className="btn45">Assign Worker</button>
            <button onClick={handle} className="btn145">Update</button>
      </div>
    </div>
    </div></div>
        </>
    );
}
export default Assign;
