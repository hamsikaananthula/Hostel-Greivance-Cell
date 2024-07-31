import "./admin.css";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {useParams} from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
export default function admin(){
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
     return(
        <>
        <header>
        <nav className="navbar">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Logout</a>
        </nav>
      </header>
            <div class="admin-page">
              
    <h2>Admin</h2>
    <div className="buttons">
      <button className="add-button">Add Student</button>
      <button className="add-button">Add Worker</button>
      <button className="add-button">Add Warden</button>
    </div>
     <br/><br/><br/>
     <div className="buttons">
      <button className="add-button">Delete Student</button>
      <button className="add-button">Delete Worker</button>
      <button className="add-button">Delete Warden</button>
    </div>
  </div>
        </>
     );
}