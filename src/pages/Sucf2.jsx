import "./submit.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
export default function Sucf2(props){
  const[succ,setSuc]=useState(false);
  const navigate=useNavigate();
  const params=useParams();
  const field=params.field;
  axios.defaults.withCredentials = true;
    const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8080/adashboard');
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
  function hom(){
    navigate(`/dash/student/${username}`);
  }
    return(
          succ? <div>
                <header>
        <nav className="navbar3">
          <a href="#" onClick={hom} className="nav-link">Home</a>
          <a href="#" onClick={handlec} className="nav-link">Logout</a>
        </nav>
      </header>
      <h1 className="h23">Student isRemoved</h1>
      <h3 className="h44">Successfully</h3>
          </div>:null
    );
}