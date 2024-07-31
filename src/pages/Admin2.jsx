import "./admin.css";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {useParams} from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
export default function Admin2(){
  axios.defaults.withCredentials = true;
  const [isFirstRender, setIsFirstRender] = useState(true); 
  const[suc,setSuc]=useState(false);
// Flag for tracking initial render
const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/adashboard');
        console.log("dashboard: " + res.data);
        if (res.data === "Success") {
          setSuc(true);
        } else {
          navigate('/admin');
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
      location.reload(true);
    }).catch(err=>console.log(err));
  }
  function hom(){
    navigate('/');
  }
  function handlec3(){
     navigate("/logf");
  }
  function handlec1(){
    navigate("/logfw");
 }
 function handlec2(){
  navigate("/logfwo");
}
function hc(){
  navigate("/dels");
}
     return(
        suc?<div>
        <header>
        <nav className="navbar87">
          <a href="#" onClick={hom}   className="nav-link">Home</a>
          <a href="#" onClick={handlec} className="nav-link">Logout</a>
        </nav>
      </header>
            <div class="admin-page">
              
    <h2>Admin</h2>
    <div className="buttons">
      <button onClick={handlec3} className="add-button">Add Student</button>
      <button onClick={handlec1} className="add-button">Add Warden</button>
      <button onClick={handlec2} className="add-button">Add Worker</button>
    </div>
     <br/><br/><br/>
     <div className="buttons">
      <button onClick={hc} className="add-button">Delete Student</button>
      <button className="add-button">Delete Worker</button>
      <button className="add-button">Delete Warden</button>
    </div>
  </div>
        </div>:null
     );
}