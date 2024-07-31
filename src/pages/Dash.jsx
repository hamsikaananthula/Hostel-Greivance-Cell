import "./complaint.css";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import {useParams} from "react-router-dom";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios'
 function Dash(){
  const navigate=useNavigate();
  const params=useParams();
  const[succ,setSuc]=useState(false);
  const username=params.username;
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
  const handlec=()=>{
    axios.get("http://localhost:8080/logout").
    then(res=>{
      location.reload(true);
    }).catch(err=>console.log(err));
  }
  function handleClick(e){
    navigate(`/data-display/${username}`);
}
    return(
        succ?<div>
        <header>
           <nav className="navbar33">
          <a onClick={handlec} href="#" className="nav-link">Logout</a>
          <a onClick={(handleClick)} href="#" className="nav-link">Your Complaints</a>
        </nav>
        </header>
        <h1 className="header">Register your complaint</h1>
<div className="container33">
  <div className="row33">
    <div className="card33">
      <div className="card-body text-center">
        {/* <i className="fas fa-bolt card-icon"></i> */}
        <h5 className="card-title">Electrical Problem</h5>
        <p className="card-description1">please Register your complaint here</p>
        <Link to={`/electrical/${username}`} >
        <button className ="btn99">Register</button>
      </Link>
      </div>
    </div>
    <div className="card33">
      <div className="card-body text-center">
        {/* <i className="fas fa-broom card-icon"></i> */}
        <h5 className="card-title">Cleaning Problem</h5>
        <p className="card-description1">please Register your complaint here.</p>
        <Link to={`/electrical/${username}`} >
        <button className ="btn99">Register</button>
      </Link>
      </div>
    </div>
    <div className="card33">
      <div className="card-body text-center">
        {/* <i className="fas fa-exclamation-triangle card-icon"></i> */}
        <h5 className="card-title">General Problem</h5>
        <p className="card-description1">please Register your complaint here</p>
        <Link to={`/electrical/${username}`} >
        <button className ="btn99">Register</button>
      </Link>
      </div>
    </div>
  </div>
</div>
</div>:null
    );
}
export default Dash;