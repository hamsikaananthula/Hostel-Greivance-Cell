
import "./Update2.css";
import React from 'react';
import "./complaint.css";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

 function Update2(){
    const location = useLocation();
    const complaints= location.state?.data || [];
    console.log(complaints);
   // const comp=complaints[0];'
     const {id}=useParams();
     const{index}=useParams();
     const{HostelName,category}=useParams();
     const [RoomNo, setRoomNo] = useState()
     const [HostelName1, setHstlname] = useState()
     const[idd,setid]=useState();
     const [details, setdetail] = useState()
     const navigate = useNavigate()
     const [selectedStatus, setSelectedStatus] = useState('');
     const[suc,setSuc]=useState(false);
     axios.defaults.withCredentials = true;
     const [isFirstRender, setIsFirstRender] = useState(true);
     axios.defaults.withCredentials = true; // Flag for tracking initial render
  
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
    const [worker,setselect]=useState();
  useEffect(()=>{
      axios.get('http://localhost:8080/getecompp/'+id)
      .then(res=>{
        console.log(res.data);
        const comp=res.data[0];
          setRoomNo(comp.RoomNo);
          //console.log(RoomNo);
          setHstlname(comp.HostelName);
         // console.log(HostelName);
          setid(comp.idd);
          setdetail(comp.details);
          setselect(comp.Worker.name);
          setSelectedStatus(comp.Status)
          console.log(worker)
      });
  });
  const handleUpdate = (complaintId) => {
      const buttonToUpdate = document.getElementById(`update-${complaintId}`);
       if (buttonToUpdate) {
           buttonToUpdate.style.color="green";
         buttonToUpdate.textContent = 'Updated'; // Change button text to "Updated"
       } else {
         console.warn(`Button with ID update-button-${complaintId} not found for updating text.`);
       }
  };
  function ht(){
    navigate(`/dd1/${HostelName}/${category}`);
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
    return (
        suc?
        <div>
        <header>
        <nav className="navbar9">
          <a href="#"  onClick={hom} className="nav-link">Home</a>
          <a href="#" onClick={ht}className="nav-link">ComplaintBox</a>
          <a href="#" onClick={handlec} className="nav-link">Logout</a>
        </nav>
      </header>
        <div className="container9">
            <h1 className="h24">Complaint Form</h1>
            <form>
                <label htmlFor="rollNo">Enter Your Id:</label>
                <input
                    type="text" id="rollNo"  placeholder={idd} value={idd} required
                />

                <label htmlFor="roomNo">Room No:</label>
                <input
                    type="text" id="rollNo" placeholder={RoomNo} value={RoomNo} required
                />
                <label htmlFor="hostelName">Hostel Name:</label>
                <input
                   type="text" id="HostelName" placeholder={HostelName1} value={HostelName1} required
                />
                <label htmlFor="details">Complaint</label>
                <textarea
                   id="details" name="details" rows="5" value={details} placeholder={details} required>
                </textarea>
                 <label htmlFor="Status">status:</label>
                <input
                   id="details" name="details" value={selectedStatus} placeholder={selectedStatus} required
                />
                 <div>
     {
      worker=="Going to be assigned"?
      <button className="btn79" onClick={() =>navigate(`/assign/${id}/${index}/${HostelName}`, { state: { data: complaints } })}>Assign</button>
       :<p>AssignedWorker:{worker}
     </p>
     }
    </div>
    <button  className="btn79" id={`update-${id}`} onClick={() => handleUpdate(id)}>Update</button>
            </form>
        </div>
        </div>:null
    );
}
export default Update2;
