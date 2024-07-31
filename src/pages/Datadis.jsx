import "./Datadis.css";
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
 function Datadis(){
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();
  const { username } = useParams();
  const [suc, setSuc] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true); // Flag for tracking initial render

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

  useEffect(() => {
    axios.get('http://localhost:8080/getcompp/' + username)
      .then(res => {
        setComplaints(res.data);
        console.log(res.data);
      })
      .catch(err => console.error(err));
  }, [username]); // Refetch complaints on username change

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete('http://localhost:8080/delcomp/' + id);
      console.log(res);

      // Optimistic Update:
      const updatedComplaints = complaints.filter((complaint) => complaint._id !== id);
      setComplaints(updatedComplaints); // Update state with filtered complaints

      // Refetch data (Recommended):
      const newComplaints = await axios.get('http://localhost:8080/getcompp/' + username);
      setComplaints(newComplaints.data); // Assuming the response has a 'data' property
    } catch (err) {
      console.error(err);
      // Handle errors appropriately, e.g., display an error message
    }
  };
  function change(){
    navigate(`/dash/student/${username}`);
  }
    return(
        <>
           <header>
        <nav className="navbar12">
          <a onClick={change} href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Logout</a>
        </nav>
       
      </header>
      <h1 className="textt">Complaints</h1>
<div class="container12">
       {complaints.map((complaint) => (
        <div className="box11" id="box1">
        <div  key={complaint._id}  className="inner">
           <p><b>Details:</b> {complaint.details}</p>
              <p><b>Status:</b> {complaint.Status}</p>
              <p><b>Worker-Name:</b> {complaint.Worker.name}</p>
              <p><b>Worker-Phoneno:</b> {complaint.Worker.Phoneno}</p>
              <button className="btn86" onClick={() => handleDelete(complaint._id)}>Delete</button>
            </div>
            </div>
          ))}
          </div>        
        </>
    );
}
export default Datadis;