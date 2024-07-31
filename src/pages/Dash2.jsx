import "./dash.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
 export default function Dash2(){
  const navigate=useNavigate();
  function adm(){
    navigate("/admin");
  }
      return(
        <>
        <header>
        <nav className="navbar56">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Logout</a>
          <a href="#" onClick={adm} className="nav-link">Admin</a>
        </nav>
      </header>
      <div className="heading56">
      <marquee>Welcome to Grievance Cell</marquee>
      </div>
           <div className="container56">
    <div className="row56">
        <div className="card56">
          <div className="card-header">
            <h5 className="mb-2">Student</h5>
          </div>
          <div className="card-body">
            <p className="card-text">Welcome, Student! Please log in to your account.</p>
            <Link to="/student/login">
        <button className ="btn56">Login</button>
      </Link>
          </div>
        </div>
        <div className="card56">
          <div className="card-header">
            <h5 className="mb-2">Warden</h5>
          </div>
          <div className="card-body">
            <p className="card-text">Welcome, Warden! Please log in to your account.</p>
            <Link to="/warden/login">
        <button className ="btn56">Login</button>
      </Link>
          </div>
        </div>
        <div className="card56">
          <div className="card-header">
            <h5 className="mb-2">Worker</h5>
          </div>
          <div className="card-body">
            <p className="card-text">Welcome, Worker! Please log in to your account.</p>
            <Link to="/worker/login">
        <button className ="btn56">Login</button>
      </Link>
          </div>
        </div>
      </div>
    </div>
        </>
      );
 }